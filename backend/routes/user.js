const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=  require("jsonwebtoken");
const {authenticateToken}= require("./userAuth");
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    if (!username || !email || !password || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (username.length < 4) {
      return res.status(400).json({ message: "Username length should be greater than 3" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if (password.length <= 5) {
      return res.status(400).json({ message: "Password should be greater than 5 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({ username, email, password: hashedPassword, address });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const existingUser=await User.findOne({username});
    if(!existingUser){
      return res.status(401).json({ message: "User not found" });
    }
    
    await bcrypt.compare(password,existingUser.password,(err, data) => {
      if(data){
        const authclaims=[{name:existingUser.name},{role:existingUser.role}];
        const token=jwt.sign({authclaims}, "bookstore123",{expiresIn: "30d"});
        res.status(200).json({id:existingUser._id, 
          token: token,
          role: existingUser.role,
        });
        
      }
      else{
        res.status(401).json({ message: "Incorrect password" });
      }
     
    });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get-user-information

router.get("/get-user-information",authenticateToken, async (req, res) => {
  try {
    const{id}=req.headers;
    const data=await User.findById(id).select("-password");
    if(!data){
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
});

//update address

router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const{id}=req.headers;
    const {address}=req.body;
    const data=await User.findByIdAndUpdate(id, {address: address});
    if(!data){
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(data);
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
  
}); 


module.exports = router;

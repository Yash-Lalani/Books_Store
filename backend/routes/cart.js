const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

//put book to cart

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; // Ensure headers use lowercase keys

        // ✅ Find user by ID
        const userData = await User.findById(id);
        const isBookinCart=userData.cart.includes(bookid);  
        

        // ✅ Check if the book is already in favorites
        if (isBookinCart) {
            return res.status(400).json({ message: "Book already in cart" });
        }

        // ✅ Add book to favorites
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });

        res.status(200).json({ message: "Book added to your cart" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//remove book from cart
router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        
        const {id}=req.headers;
        // ✅ Find user by ID
    
        await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
        res.status(200).json({ message: "Book removed from your cart" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
        });

//GET A CART OF A PARTICULAR USER 
router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        // ✅ Find user by ID
        const userData = await User.findById(id).populate("cart");
         const cart=userData.cart.reverse();
         return res.json({status: 200, data: cart});   
         } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
        });


module.exports =router;
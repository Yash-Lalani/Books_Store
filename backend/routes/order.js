const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");
const Book= require("../models/book");
const Order= require("../models/order");

router.post("/place-order",authenticateToken,async(req,res)=>{
    try{
        const {id}= req.headers;
        const {order}= req.body;
        for(const orderData of order){
            const newOrder=new Order({user:id,book:orderData._id});
            const orderDataFromDb=await newOrder.save();    

            await User.findByIdAndUpdate(id,{$push:{orders:orderDataFromDb._id},});

            await User.findByIdAndUpdate(id,{$pull:{cart:orderData._id},});
            
        }
        res.status(200).json({message:"Order placed successfully"});
}
    catch(error){
        console.error("Error:",error);
        res.status(500).json({message:"Internal server error"});
        }
    });


    router.get("/get-order-history",authenticateToken,async(req,res)=>{
        try{
            const {id}= req.headers;
            const userData=await User.findById(id).populate({
                path: 'orders',
                populate: { path: 'book'}
            });
            const orderData=userData.orders.reverse();
            return res.json({
                status: 200,
                data: orderData
            });
            
    }
        catch(error){
            console.error("Error:",error);
            res.status(500).json({message:"Internal server error"});
            }
        });

        //get-all-orders ---admin
        router.get("/get-all-orders", async (req, res) => {
            try {
                const userData = await Order.find()
                    .populate({ path: "book" })
                    .populate({ path: "user" })
                    .sort({ createdAt: -1 });
        
                return res.json({
                    status: 200,
                    data: userData
                });
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });

        //update order
        router.put("/update-status/:id", authenticateToken, async (req, res) => {
            try {
                const { id } = req.params;
                
                await Order.findByIdAndUpdate(id, {status:req.body.status});
        
                return res.json({
                    status: "Success",
                    message:"Status updated"
                });
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
        

    

module.exports = router;
const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// 🔹 Add Book to Favorites
router.put("/add-book-to-favorite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers; // Ensure headers use lowercase keys

        // ✅ Find user by ID
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // ✅ Check if the book is already in favorites
        if (userData.favourites.includes(bookid)) {
            return res.status(400).json({ message: "Book already in your favourites" });
        }

        // ✅ Add book to favorites
        await User.findByIdAndUpdate(id, { $addToSet: { favourites: bookid } });

        res.status(200).json({ message: "Book added to your favourites" });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


    router.put("/remove-book-from-favorite", authenticateToken, async (req, res) => {
        try {
            const { bookid,id } = req.headers;
            // ✅ Get user ID from token

            const userData = await User.findById(id);
        
            // ✅ Check if the book is already in favorites
            const isBookFavorite =  userData.favourites.includes(bookid);
            if (isBookFavorite) {
                await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
            }

            // ✅ Corrected update query
            

            res.json({ message: "Book remove to your favourites" });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    });

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const {id } = req.headers;
         // ✅ Get user ID from token

        const userData = await User.findById(id).populate("favourites");
        

        // ✅ Check if the book is already in favorites
        const favoriteBooks=userData.favourites;
      
            return res.status(200).json({ status: "success",data: favoriteBooks});
       
        // ✅ Corrected update query
       

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;

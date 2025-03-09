const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");  // Use 'Book' instead of 'book'
const { authenticateToken } = require("./userAuth");


router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;

        // ✅ Check if query is provided
        if (!query || typeof query !== "string") {
            return res.status(400).json({ success: false, message: "Invalid search query" });
        }

        console.log("Received search query:", query); // Debugging log

        // ✅ Use $regex with case-insensitive search
        const books = await Book.find({ title: { $regex: new RegExp(query, "i") } });

        console.log("Search results:", books); // Debugging log
        res.json({ success: true, data: books });

    } catch (error) {
        console.error("Error in search API:", error); // Log the error details
        res.status(500).json({ success: false, message: "Server error" });
    }
});
// Add book - only admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        if (!id) {
            return res.status(400).json({ message: "User ID is required in headers" });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Validate request body
        const { url, title, author, price, desc, language } = req.body;
        if (!url || !title || !author || !price || !desc || !language) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const book = new Book({ url, title, author, price, desc, language });

        await book.save();
        res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//update book
router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const {bookid}=req.headers;
        await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            language:req.body.language
        });
        res.status(200).json({ message: "Book updated successfully" });
        } catch (error) {
            console.error("Error updating book:", error);
            res.status(500).json({ message: "Internal server error" });
        }
        
        });

//delete book
router.delete("/delete-book", authenticateToken, async (req, res) => {

    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book deleted successfully" });
        } catch (error) {
            console.error("Error deleting book:", error);
            res.status(500).json({ message: "Internal server error" });
        }
        
        });


        //get all books
        router.get("/get-all-books", async (req, res) => {
            try {
                const books = await Book.find().sort({createdAt:-1});
                res.json({status: 200, data: books});
            } catch (error) {
                console.error("Error fetching books:", error);
                res.status(500).json({ message: "Internal server error" });
            }
        });
        
//get recently added books limit 4
router.get("/get-recent-books", async (req, res) => {
    try {
      const books = await Book.find().sort({ createdAt: -1 }).limit(10); // Fetch recent books
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  });
//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const{id}=req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ status: 200, data: book });
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;

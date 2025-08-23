const express = require("express")
const router = express.Router()
const upload = require("../middlewares/uploader")
const authentication = require("../middlewares/AuthMiddleware")
const bookModel = require("../models/bookModel")
const axios = require("axios")
const dotenv = require("dotenv")

dotenv.config()


router.post("/save",authentication, upload.fields([{ name: 'pdfFile' }, { name: 'coverImage' }]), async (req, res) => {
    try {
      const { title, author, genre, summary, totalPages, date } = req.body;
      const userId = req.user.id; // Assuming you are using JWT authentication
      const coverImagePath = req.files['coverImage'][0].path;
      const pdfFilePath = req.files['pdfFile'][0].path;
  
      const book = await bookModel.create({
        title,
        author,
        genre,
        summary,
        totalPages,
        date,
        user: userId,
        coverImage: coverImagePath,
        pdfFilePath: pdfFilePath
      });
  
      res.status(201).json({ message: "Book saved successfully", book });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  });


// route to view saved books for a particular user
router.get("/saved",authentication,async(req,res)=>{
    try {
        const userId = req.user

        if(!userId){
            return res.status(400).json({error:"Please provide the user id"});
        }

        //then we have to fetch the books based on the user
        const books = await bookModel.find({user:userId})

        if(!books){
            return res.status(404).json({error:"No books saved"});
        }
         return res.status(200).json({message:"Books retrieved successfully",books})
    } catch (error) {
        return res.status(500).json({error:`Error:${error.message}`})
    }
})

//deleting saved books for a particular user
router.delete("/saved/:id",authentication,async(req,res)=>{
    try {
        const bookId = req.params.id
        if(!bookId){
            return res.status(400).json({error:"Please provide a book id"});
        }

        const deleted = await bookModel.findByIdAndDelete(bookId)

        if(!deleted){
            return res.status(404).json({error:"Failed to find the book"})
        }
        return res.status(200).json({message:"Book deleted successfully",deleted})

    } catch (error) {
        return res.status(500).json({error:"Internal server error"})
    }
})

//route to retrieve all books from an api
router.get("/search",  async (req, res) => {
    const query = req.query.query; 

    if (!query) {
        return res.status(400).json({ error: "Please provide a search query" });
    }

    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${process.env.BOOKS_API_KEY}`);
        
        if (response.status === 200) {
            const books = response.data.items.map(item => {
                const volumeInfo = item.volumeInfo;

                return {
                    title: volumeInfo.title || "Unknown Title",
                    author: (volumeInfo.authors && volumeInfo.authors[0]) || "Unknown Author",
                    genre: (volumeInfo.categories && volumeInfo.categories[0]) || "Unknown Genre",
                    coverImage: (volumeInfo.imageLinks?.large || 
                        volumeInfo.imageLinks?.medium || 
                        volumeInfo.imageLinks?.thumbnail || 
                        volumeInfo.imageLinks?.smallThumbnail || 
                        "https://via.placeholder.com/150"),  // Set 1 if cover exists, 0 if not
                    pdfFilePath: (item.accessInfo && item.accessInfo.pdf && item.accessInfo.pdf.isAvailable)? item.accessInfo.pdf.acsTokenLink: "No PDF available",
                    summary: volumeInfo.description || "No summary available",
                    totalPages: volumeInfo.pageCount ? volumeInfo.pageCount.toString() : "Unknown",
                    date: new Date()
                };
            });

            return res.status(200).json({ books });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "An error occurred while searching for books" });
    }
});


module.exports = router
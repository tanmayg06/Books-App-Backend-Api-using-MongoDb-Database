import Book from "../models/bookModel.js";
import User from "../models/userModel.js";


const getAllBooks = async (req, res) => {const books = await Book.find();
    res.json(books);
};



const getBookById = async (req, res) => {
    try {
    const book = await Book.findById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
} catch (error) {
    res.status(400).json({ message: "Invalid book ID" });
}
};



const getFavoritesByUserId = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (user) {
            const favoriteBooks = await Book.find({ _id: { $in: user.favorites } });
            res.json({ userId: user.userId, favorites: favoriteBooks });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid user ID" });
    }
};


const addBook = async (req, res) => {
    const newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages
    });
    await newBook.save();
    res.json({ id: newBook._id, message: "Book added successfully" });
};


const addBookToFavorites = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        const book = await Book.findById(req.body.bookId);
        if (user && book) {
            user.favorites.push(book._id);
            await user.save();
            res.json({ message: "Book added to favorites" });
        } else {
            res.status(404).json({ message: "User or Book not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid user ID or book ID" });
    }
};


const deleteBookById = async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);
        if (result) {
            res.json({ message: "Book deleted successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid book ID" });
    }
};


const deleteBookFromFavorites = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (user) {
            user.favorites = user.favorites.filter(favId => favId != req.body.bookId);
            await user.save();
            res.json({ message: "Book removed from favorites" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid user ID or book ID" });
    }
};


const updateBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.pages = req.body.pages || book.pages;
            await book.save();
            res.json({ message: "Book updated successfully" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid book ID" });
    }
};

const updateFavoritesByUserId = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        const newUserId = req.body.userId;
        if (user && newUserId) {
            const newUser = await User.findOne({ userId: newUserId }) || new User({ userId: newUserId, favorites: [] });
            newUser.favorites = [...newUser.favorites, ...user.favorites];
            await newUser.save();
            res.json({ message: "Book shared successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: "Invalid user ID" });
    }
};


const getBooksAnalytics = async (req, res) => {
    const analytics = {
        bookId: 1,
        totalReads: 150,
        mostPopularSection: "Chapter 1",
        uniqueReaders: 75
    };
    res.json(analytics);
};


const getBookQRCode = async (req, res) => {
    const qrCode = "https://api.qrserver.com/v1/create-qr-code/?data=HelloWorld!&size=100x100";
    res.json({ qrCode });
};


export { getAllBooks, getBookById, getFavoritesByUserId, addBook, addBookToFavorites, deleteBookById, deleteBookFromFavorites, updateBookById, updateFavoritesByUserId, getBooksAnalytics, getBookQRCode };





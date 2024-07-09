import express from 'express';
const router = express.Router();
import { getAllBooks, getBookById, getFavoritesByUserId, addBook, addBookToFavorites, deleteBookById,deleteBookFromFavorites, updateBookById, updateFavoritesByUserId, getBooksAnalytics, getBookQRCode } from '../controllers/booksController.js';


router.get("/books" , getAllBooks);
router.get("/books/:id" , getBookById);
router.get("'/favorites/users/:userId'" , getFavoritesByUserId);
router.post("/books" , addBook);
router.post("/favorites/users/:userId" , addBookToFavorites);
router.delete("/books/:id" , deleteBookById);
router.delete("/favorites/users/:userId" , deleteBookFromFavorites);
router.put("/books/:id" , updateBookById);
router.put("/favorites/users/:userId" , updateFavoritesByUserId);
router.get("/books/analytics" , getBooksAnalytics);
router.get("/books/qrcode" , getBookQRCode);


export default router;
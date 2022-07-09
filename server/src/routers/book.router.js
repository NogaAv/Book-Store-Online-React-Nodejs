import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import authAdmin from '../middlewares/admin.auth.js';

const bookRouter = express.Router();

bookRouter.get('/books', bookController.getAll);
bookRouter.get('/book/:id', bookController.getBook);

//admin operations
bookRouter.post('/book/new', authAdmin, bookController.createBook);
bookRouter.post('/books/many-new', authAdmin, bookController.createBooks);
bookRouter.delete('/book/:id', authAdmin, bookController.deleteBook);
bookRouter.patch('/book/:id', authAdmin, bookController.updateBook);

export default bookRouter;

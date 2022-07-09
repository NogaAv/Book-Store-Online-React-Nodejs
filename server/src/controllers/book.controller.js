import Book from '../models/book.model.js';
import Cart from '../models/cart.model.js';
import { ErrorResponse, SuccessResponse } from '../models/response.model.js';

export const createBook = async (req, res, next) => {
    try {
        const newBook = await new Book(req.body);
        await newBook.save();

        res.status(201).send(new SuccessResponse(201, 'created', 'New book added to DB', { newBook: newBook }));
    } catch (err) {
        next(err);
    }
};

export const createBooks = async (req, res, next) => {
    const books = req.body.books;

    if (!books || books.length === 0) {
        res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Invalid books array in body request.'));
        return;
    }

    try {
        for (let i = 0; i < books.length; ++i) {
            const newBook = await new Book(books[i]);
            await newBook.save();
        }
        res.status(201).send(new SuccessResponse(201, 'Created', 'New book added to DB', books));
    } catch (err) {
        next(err);
    }
};

export const updateBook = async (req, res, next) => {
    const bookID = req.params.id;
    const updatedBookData = req.body;

    try {
        if (!bookID) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Book _id is missing from request.'));
            return;
        }

        const returnres = await Book.updateOne({ _id: bookID }, updatedBookData);

        res.status(200).send(new SuccessResponse(200, 'Ok', 'Updated book successfully', {}));
    } catch (err) {
        next(err);
    }
};

export const deleteBook = async (req, res, next) => {
    const bookID = req.params.id;

    try {
        if (!bookID) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Book _id is missing from request.'));
            return;
        }

        const delResult = await Book.deleteOne({ _id: bookID });
        if (delResult.deletedCount !== 1) {
            const msg =
                delResult.deletedCount === 0
                    ? 'Book id does not exist in DB'
                    : `Deletion count operation returned: ${delResult.deletedCount}`;

            res.status(400).send(new ErrorResponse(400, 'Bad Request', msg));
            return;
        }

        //Must remove deleted book from carts that added the book prior for deletion
        const allCarts = await Cart.find({});

        allCarts.map(async (cart) => {
            if (cart.books.includes({ bookRef: bookID })) {
                cart.books = cart.books.filter((book) => book.bookRef !== bookID);
                await cart.save;
            }
        });

        res.status(200).send(new SuccessResponse(200, 'Ok', 'Deleted book successfully', {}));
    } catch (err) {
        next(err);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).send(
            new SuccessResponse(200, 'Ok', 'Retrieved all books from DB sucssesfully', { books: books })
        );
    } catch (err) {
        next(err);
    }
};

export const getBook = async (req, res, next) => {
    const bookID = req.params.id;
    try {
        if (!bookID) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Invalid request string params'));
            return;
        }

        const book = await Book.findById(bookID);
        if (!book) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Book is not found'));
            return;
        }

        res.status(200).send(new SuccessResponse(200, 'Ok', 'Retrieved requested book successfully', { book: book }));
    } catch (err) {
        next(err);
    }
};

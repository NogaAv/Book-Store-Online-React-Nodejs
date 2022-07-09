import Book from '../models/book.model.js';
import { ErrorResponse, SuccessResponse } from '../models/response.model.js';

export const addBook = async (req, res, next) => {
    const bookID = req.params.id;
    const cart = req.cart;

    if (!bookID || !(await Book.findOne({ _id: bookID }))) {
        res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Invalid Book ID.'));
        return;
    }

    try {
        if (cart.books.length === 0) {
            cart.books.push({ bookRef: bookID, quantity: 1 });
            await cart.save();
        } else if (!cart.books.find((book) => book.bookRef.toString() === bookID)) {
            cart.books.unshift({ bookRef: bookID, quantity: 1 });
            await cart.save();
        }

        const populatedCart = await cart.populate({ path: 'books.bookRef' });
        res.status(200).send(new SuccessResponse(200, 'Ok', 'The book was added to your cart', populatedCart));
    } catch (err) {
        next(err);
    }
};

export const removeBook = async (req, res, next) => {
    const bookID = req.params.id;
    const cart = req.cart;

    try {
        if (!bookID || !(await Book.findOne({ bookRef: bookID }))) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Book does not exist in cart'));
            return;
        }

        cart.books = cart.books.filter((book) => book.bookRef.toString() !== bookID);
        await cart.save();

        if (cart.books.length > 0) await cart.populate('books.bookRef');

        res.status(200).send(new SuccessResponse(200, 'Ok', 'Removed book from cart succsessfully', { cart: cart }));
    } catch (err) {
        next(err);
    }
};

export const increaseQuantity = async (req, res, next) => {
    const bookID = req.params.id;
    const cart = req.cart;

    try {
        const bookInCart = cart.books.find((book) => {
            return book.bookRef.toString() === bookID;
        });
        if (!bookID || !bookInCart) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Book does not exist in cart'));
            return;
        }

        bookInCart.quantity++;
        await cart.save();

        if (cart.books.length > 0) await cart.populate('books.bookRef');
        res.status(200).send(
            new SuccessResponse(200, 'Ok', 'Book quantity increased successfully', { cart: cart, book: bookInCart })
        );
    } catch (err) {
        next(err);
    }
};

export const decreaseQuantity = async (req, res, next) => {
    const bookID = req.params.id;
    const cart = req.cart;

    try {
        const bookInCart = cart.books.find((book) => {
            return book.bookRef.toString() === bookID;
        });
        if (!bookID || !bookInCart) {
            res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Book does not exist in cart'));
            return;
        }

        bookInCart.quantity--;
        await cart.save();

        if (cart.books.length > 0) await cart.populate('books.bookRef');
        res.status(200).send(
            new SuccessResponse(200, 'Ok', 'Book quantity decreased successfully', { cart: cart, book: bookInCart })
        );
    } catch (err) {
        next(err);
    }
};

export const clearCart = async (req, res, next) => {
    const cart = req.cart;

    if (cart.books.length === 0) {
        res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Cart is already empty'));
        return;
    }
    try {
        cart.books = [];
        await cart.save();
        res.status(200).send(new SuccessResponse(200, 'Ok', 'Cleared cart succsessfully', { cart: cart }));
    } catch (err) {
        next(err);
    }
};

export const checkout = async (req, res, next) => {
    const cart = req.cart;

    if (cart.books.length === 0) {
        res.status(400).send(new ErrorResponse(400, 'Bad Request', 'Cart is already empty'));
        return;
    }
    try {
        cart.books = [];
        await cart.save();
        res.status(200).send(new SuccessResponse(200, 'Ok', 'Checked out succsessfully', { cart: cart }));
    } catch (err) {
        next(err);
    }
};

export const getCart = async (req, res, next) => {
    const cart = req.cart;

    try {
        if (cart.books.length > 0) {
            await cart.populate('books.bookRef');
        }
        res.status(200).send(new SuccessResponse(200, 'Ok', 'Cart retrieved successfully', { cart }));
    } catch (err) {
        next(err);
    }
};

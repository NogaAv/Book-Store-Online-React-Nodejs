import mongoose from 'mongoose';
import isURL from 'validator/lib/isurl.js';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
    },
    author: {
        type: String,
        trim: true,
        required: [true, 'Author is required'],
    },
    bookCover: {
        type: String,
        trim: true,
        required: [true, 'URL of book cover is required'],
        unique: true,
        validate(url) {
            if (!isURL(url)) {
                throw new Error('Invalid book cover URL');
            }
        },
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'Book description is required'],
    },
    pages: {
        type: Number,
        required: [true, 'Number of pages are required'],
        min: 1,
    },
    price: {
        type: Number,
        min: 0,
        required: [true, 'Price is required'],
    },
    rating: {
        type: Number,
        min: 0,
    },
});

bookSchema.methods.toJSON = function () {
    const book = this.toObject();
    book.price = `${book.price}$`;
    book.rating = `${book.rating}`;

    delete book.__v;

    return book;
};

const Book = mongoose.model('Book', bookSchema);
export default Book;

import React, { useReducer, useContext } from 'react';
import BookReducer, { BOOK_FORM_STATE } from '../../../../../reducers/Admin/book.reducer';
import updateState from '../../../../../actions/form.actions.js';
import { AuthContext } from '../../../../../contexts/Auth.context.jsx';
import AddOrUpdateBookModal from '../add-or-update-book-modal/AddOrUpdateBookModal.component.jsx';
import { updateBook, deleteBook } from '../../../../../services/book.service.js';
import isURL from 'validator/lib/isURL';

import './update-book-modal.style.css';

const UpdateBookModal = (props) => {
    const [bookFormState, dipatchBookReducer] = useReducer(BookReducer, BOOK_FORM_STATE);
    const authContextValue = useContext(AuthContext);

    const required = { title: false, author: false, description: false, bookCover: false, pages: false, price: false };

    const editBookOnSubmit = async (event) => {
        event.preventDefault();

        if (
            !bookFormState.validities.title ||
            !bookFormState.validities.author ||
            !bookFormState.validities.bookCover ||
            !bookFormState.validities.description ||
            !bookFormState.validities.pages ||
            !bookFormState.validities.price ||
            !bookFormState.validities.id ||
            !bookFormState.validities.rating ||
            bookFormState.values.id === '' ||
            (bookFormState.values.id !== '' &&
                bookFormState.values.title === '' &&
                bookFormState.values.author === '' &&
                bookFormState.values.bookCover === '' &&
                bookFormState.values.description === '' &&
                bookFormState.values.pages === 0 &&
                bookFormState.values.price < 0 &&
                bookFormState.values.rating < 0)
        ) {
            alert('Cannot submit book update form. Please check your inputs validity');
            return;
        }

        try {
            const bookId = bookFormState.values.id;
            const values = { ...bookFormState.values };
            delete values.id;
            if (bookFormState.values.title === '') delete values.title;
            if (bookFormState.values.author === '') delete values.author;
            if (bookFormState.values.bookCover === '') delete values.bookCover;
            if (bookFormState.values.description === '') delete values.description;
            if (bookFormState.values.pages === 0) delete values.pages;
            if (bookFormState.values.price < 0) delete values.price;
            if (bookFormState.values.rating < 0) delete values.rating;

            const { message } = await updateBook(values, bookId, authContextValue.adminToken);

            alert(message);
            console.log(message);
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert(`Error from server: ${err.message}`);
        }
    };

    const deleteBookOnSubmit = async (event) => {
        event.preventDefault();

        if (!bookFormState.validities.id || bookFormState.values.id === '') {
            alert('Cannot submit book deletion form. Please check your input validity');
            return;
        }

        try {
            const { message } = deleteBook(bookFormState.values.id, authContextValue.adminToken);

            alert(`${message}`);
            console.log(`${message}} `);
            window.location.reload();
        } catch (err) {
            console.log(err.message);
            alert(`Error from server: ${err.message}`);
        }
    };

    const handleId = (event) => {
        const inputId = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        if (inputId === '') {
            dipatchBookReducer(updateState(field, inputId, false, `Book id is required!`));
        } else {
            dipatchBookReducer(updateState(field, inputId, true, ''));
        }
    };
    const handelTitle = (event) => {
        const inputTitle = event.target.value.trim();
        const field = event.target.name;

        dipatchBookReducer(updateState(field, inputTitle, true, ''));
    };

    const handelAuthor = (event) => {
        const inputAuthor = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        dipatchBookReducer(updateState(field, inputAuthor, true, ''));
    };

    const handelBookCover = (event) => {
        const inputBookCover = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        if (!isURL(inputBookCover)) {
            dipatchBookReducer(updateState(field, inputBookCover, false, `Invalid URL string`));
        } else {
            dipatchBookReducer(updateState(field, inputBookCover, true, ''));
        }
    };

    const handelDescription = (event) => {
        const inputDescription = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        dipatchBookReducer(updateState(field, inputDescription, true, ''));
    };

    const handelPagesCount = (event) => {
        const inputPagesCount = event.target.value.trim().toLowerCase();
        const field = event.target.name;
        if (inputPagesCount < 0) {
            dipatchBookReducer(updateState(field, inputPagesCount, false, `Must be a positive number`));
        } else if (inputPagesCount % 1 !== 0) {
            dipatchBookReducer(updateState(field, inputPagesCount, false, `Must be a whole number`));
        } else {
            dipatchBookReducer(updateState(field, inputPagesCount, true, ''));
        }
    };

    const handelPrice = (event) => {
        const inputPrice = event.target.value.trim().toLowerCase();
        const field = event.target.name;
        if (inputPrice < 0) {
            dipatchBookReducer(updateState(field, inputPrice, false, `Must be a positive number`));
        } else {
            dipatchBookReducer(updateState(field, inputPrice, true, ''));
        }
    };

    return (
        <AddOrUpdateBookModal
            setShow={props.setShow}
            title={props.title}
            editBookOnSubmit={editBookOnSubmit}
            deleteBookOnSubmit={deleteBookOnSubmit}
            handelTitle={handelTitle}
            handelAuthor={handelAuthor}
            handelDescription={handelDescription}
            handelBookCover={handelBookCover}
            handelPagesCount={handelPagesCount}
            handelPrice={handelPrice}
            bookFormState={bookFormState}
            dipatchBookReducer={dipatchBookReducer}
            required={required}
            handelupdate={handleId}
        />
    );
};

export default UpdateBookModal;

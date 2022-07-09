import React, { useReducer, useContext } from 'react';
import BookReducer, { BOOK_FORM_STATE } from '../../../../../reducers/Admin/book.reducer';
import updateState from '../../../../../actions/form.actions.js';
import { AuthContext } from '../../../../../contexts/Auth.context.jsx';
import AddOrUpdateBookModal from '../add-or-update-book-modal/AddOrUpdateBookModal.component.jsx';
import { createBook } from '../../../../../services/book.service.js';
import isURL from 'validator/lib/isURL';

import './add-book-modal.css';

const AddBookModal = (props) => {
    const [bookFormState, dipatchBookReducer] = useReducer(BookReducer, BOOK_FORM_STATE);
    const authContextValue = useContext(AuthContext);

    const required = {
        title: true,
        author: true,
        description: true,
        bookCover: true,
        pages: true,
        price: true,
        rating: false,
    };

    const addBookHandler = async (event) => {
        event.preventDefault();

        if (
            !bookFormState.validities.title ||
            !bookFormState.validities.author ||
            !bookFormState.validities.bookCover ||
            !bookFormState.validities.description ||
            !bookFormState.validities.pages ||
            !bookFormState.validities.price ||
            !bookFormState.validities.rating ||
            bookFormState.values.title === '' ||
            bookFormState.values.author === '' ||
            bookFormState.values.bookCover === '' ||
            bookFormState.values.description === '' ||
            bookFormState.values.pages === 0 ||
            bookFormState.values.price < 0 ||
            bookFormState.values.rating < 0
        ) {
            alert('Cannot submit book addition form. Please check your inputs validity');
            return;
        }

        try {
            const { data } = await createBook(bookFormState.values, authContextValue.adminToken);
            const { newBook } = data;
            alert(`Book added successfully (_id: ${newBook._id}) `);
            console.log(`Book added successfully (_id: ${newBook._id}) `);
            window.location.reload();
        } catch (err) {
            console.log(err.message);
            alert(err.message);
        }
    };

    const handelTitle = (event) => {
        const inputTitle = event.target.value.trim();
        const field = event.target.name;

        if (inputTitle === '') {
            dipatchBookReducer(updateState(field, inputTitle, false, `Title is required!`));
        } else {
            dipatchBookReducer(updateState(field, inputTitle, true, ''));
        }
    };

    const handelAuthor = (event) => {
        const inputAuthor = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        if (inputAuthor === '') {
            dipatchBookReducer(updateState(field, inputAuthor, false, `Author name is required!`));
        } else {
            dipatchBookReducer(updateState(field, inputAuthor, true, ''));
        }
    };

    const handelBookCover = (event) => {
        const inputBookCover = event.target.value.trim().toLowerCase();
        const field = event.target.name;

        if (inputBookCover === '') {
            dipatchBookReducer(updateState(field, inputBookCover, false, `Book cover URL is required!`));
        } else if (!isURL(inputBookCover)) {
            dipatchBookReducer(updateState(field, inputBookCover, false, `Invalid URL string`));
        } else {
            dipatchBookReducer(updateState(field, inputBookCover, true, ''));
        }
    };

    const handelDescription = (event) => {
        const inputDescription = event.target.value.trim().toLowerCase();
        const field = event.target.name;
        if (inputDescription === '') {
            dipatchBookReducer(updateState(field, inputDescription, false, `Book description is required!`));
        } else {
            dipatchBookReducer(updateState(field, inputDescription, true, ''));
        }
    };

    const handelPagesCount = (event) => {
        const inputPagesCount = event.target.value.trim().toLowerCase();
        const field = event.target.name;
        if (!inputPagesCount) {
            dipatchBookReducer(updateState(field, inputPagesCount, false, `Number of pages required`));
        } else if (inputPagesCount < 0) {
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
        if (!inputPrice) {
            dipatchBookReducer(updateState(field, inputPrice, false, `Price is required`));
        } else if (inputPrice < 0) {
            dipatchBookReducer(updateState(field, inputPrice, false, `Must be a positive number`));
        } else {
            dipatchBookReducer(updateState(field, inputPrice, true, ''));
        }
    };

    return (
        <AddOrUpdateBookModal
            setShow={props.setShow}
            title={props.title}
            onSubmit={addBookHandler}
            handelTitle={handelTitle}
            handelAuthor={handelAuthor}
            handelDescription={handelDescription}
            handelBookCover={handelBookCover}
            handelPagesCount={handelPagesCount}
            handelPrice={handelPrice}
            bookFormState={bookFormState}
            dipatchBookReducer={dipatchBookReducer}
            required={required}
            update={false}
        />
    );
};

export default AddBookModal;

import React from 'react';
import BookItem from './book-item/BookItem.component';
import './book-container.style.css';

const BookContainer = (props) => {
    return (
        <div className="book-container">
            <BookItem book={props.book} />
            {props.children}
        </div>
    );
};

export default BookContainer;

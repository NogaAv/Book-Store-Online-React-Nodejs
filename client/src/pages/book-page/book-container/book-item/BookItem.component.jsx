import React from 'react';
import './book-item.style.css';

const BookItem = (props) => {
    return (
        <div className="book-page-item">
            <img className="book-cover" src={props.book.bookCover} alt="book-cover" />
            <div className="book-info">
                <h2>{props.book.title}</h2>
                <hr />
                <p>{props.book.author}</p>
                <div>{props.book.description}</div>
            </div>
        </div>
    );
};

export default BookItem;

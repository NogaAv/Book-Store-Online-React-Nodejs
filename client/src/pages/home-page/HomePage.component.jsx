import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import BookCard from './book-card/BookCard.component.jsx';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import ModeSwitch from '../../components/shared/mode-switch/ModeSwitch.component.jsx';
import { getBooks } from '../../services/book.service.js';

import './home-page.styles.css';
import { LOADER_TIMEOUT } from '../../constants/constants.js';

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getAllBooks = async () => {
            try {
                const { data } = await getBooks();
                setBooks(data.books);
                setTimeout(() => setIsLoading(false), LOADER_TIMEOUT);
                console.log('Successfully fetched books from server');
            } catch (err) {
                console.log(err);
                alert('Something went wrong');
                navigate('*');
            }
        };

        getAllBooks();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main homepage-main">
            <ModeSwitch />

            {books.map((book, index) => (
                <BookCard
                    key={index}
                    id={book._id}
                    title={book.title}
                    author={book.author}
                    bookCover={book.bookCover}
                    price={book.price}
                    rating={book.rating}
                />
            ))}
        </main>
    );
};

export default HomePage;

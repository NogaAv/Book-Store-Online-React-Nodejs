import { useNavigate } from 'react-router-dom';
import React, { useState, useEffext } from 'react';
import noStarsIcon from './../../../assets/img/stars/0stars.jpg';
import oneStarIcon from './../../../assets/img/stars/1stars.jpg';
import twoStarsIcon from './../../../assets/img/stars/2stars.jpg';
import threeStarsIcon from './../../../assets/img/stars/3stars.jpg';
import fourStarsIcon from './../../../assets/img/stars/4stars.jpg';
import fiveStarsIcon from './../../../assets/img/stars/5stars.jpg';

import './bookcard.styles.css';
import { useEffect } from 'react';

const BookCard = (props) => {
    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);
    const [stars, setStars] = useState(0);

    const handleRating = (rate) => {};
    useEffect(() => {
        props.rating !== 'undefined' ? setStars(+props.rating) : setStars(handleRating(0));
    }, []);

    const bookHandler = () => {
        navigate(`/book/${props.id}`);
    };

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    return (
        <div className="item" onClick={bookHandler} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <img className="book-covers" src={props.bookCover} alt="book-cover" />
            <div className="item-info">
                <h3 className={isHovering ? 'full-title' : 'short-title'}>{props.title}</h3>
                <p className="author">{props.author}</p>
                <p className="price">{props.price}</p>
                <div className="rating">
                    <div className="stars">{(stars < 1 || !stars) && <img src={noStarsIcon} alt="" />}</div>
                    <div className="stars">{stars === 1 && <img src={oneStarIcon} alt="" />}</div>{' '}
                    <div className="stars">{stars === 2 && <img src={twoStarsIcon} alt="" />}</div>{' '}
                    <div className="stars">{stars === 3 && <img src={threeStarsIcon} alt="" />}</div>{' '}
                    <div className="stars">{stars === 4 && <img src={fourStarsIcon} alt="" />}</div>{' '}
                    <div className="stars">{stars === 5 && <img src={fiveStarsIcon} alt="" />}</div>
                </div>
            </div>
        </div>
    );
};

export default BookCard;

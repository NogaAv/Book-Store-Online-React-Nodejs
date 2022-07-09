import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context.jsx';
import { CartContext } from '../../contexts/cart.context.jsx';
import { mode, securityModeContext } from '../../contexts/SecurityMode.context.jsx';
import creatCartAction, { cartActionType } from '../../actions/cart.actions.js';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import CstmBtn from '../../components/custom-btn/CstmBtn.component.jsx';
import BookContainer from './book-container/BookContainer.component.jsx';
import MarketingInfo from './book-container/marketing-info/MarketingInfo.component.jsx';
import MarketingInfoLine from './book-container/marketing-info/marketing-info-line/MarketingInfoLine.component.jsx';
import ProductDetails from './book-container/product-details/ProductDetails.component.jsx';
import { addBookToCart } from '../../services/cart.service.js';
import rocketLogo from '../../assets/img/Rocket-icon.png';
import vLogo from '../../assets/img/v-icon.png';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './book-page.style.css';
import { getBook } from '../../services/book.service.js';

const BookPage = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const CartContextValue = useContext(CartContext);
    const authContextValue = useContext(AuthContext);
    const secModeContextValue = useContext(securityModeContext);
    const [book, setBook] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const addToCart = async () => {
        if (!authContextValue.userToken) {
            alert('Please login to add items to your cart');
            navigate('/login');
            return;
        }

        const bookID = params.id;
        try {
            const { data } = await addBookToCart(bookID, authContextValue.userToken);
            const cart = data;
            CartContextValue.cartDispacher(creatCartAction(cartActionType.ADD_BOOK, cart.books));
        } catch (err) {
            console.log(err.message);
            alert('Something went wrong');
        }
    };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const { data } = await getBook(params.id);
                setBook(data.book);

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
            } catch (err) {
                console.log(err);
                alert('Something went wrong.');
            }
        };

        fetchBook();
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main main-book-page">
            <BookContainer book={book}>
                <MarketingInfo>
                    <MarketingInfoLine logo={rocketLogo}>Free delivery worldwide</MarketingInfoLine>
                    <MarketingInfoLine logo={vLogo}>
                        Details about local duties and taxes <a href="#">here</a>
                    </MarketingInfoLine>
                    <MarketingInfoLine logo={vLogo}>
                        Available. Expected delivery to Israel in 13-16 business days.
                    </MarketingInfoLine>
                    <p className="book-page-price">Price: {book.price}</p>
                    {secModeContextValue.secModesState < mode.switchOn_adminNotLogged && (
                        <CstmBtn className="add-crt-btn" onClick={addToCart} alert="Book Added To Cart!">
                            Add To Cart
                        </CstmBtn>
                    )}
                </MarketingInfo>
            </BookContainer>
            <ProductDetails pages={book.pages} />
        </main>
    );
};

export default BookPage;

import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../../contexts/cart.context.jsx';
import { AuthContext } from '../../../contexts/Auth.context.jsx';
import creatCartAction, { cartActionType } from '../../../actions/cart.actions.js';
import CstmBtn from '../../../components/custom-btn/CstmBtn.component.jsx';
import CartItem from './cart-item/CartItem.component.jsx';
import { checkOut, clearCart } from '../../../services/cart.service.js';
import './cart-items.style.css';

const CartItems = (props) => {
    const cartContextValue = useContext(CartContext);
    const authContextValue = useContext(AuthContext);
    const [checkedOut, setCheckedOut] = useState(false);

    useEffect(() => {
        setCheckedOut(false);
    }, []);

    const handleCheckOut = async () => {
        try {
            const { data } = await checkOut(authContextValue.userToken);
            cartContextValue.cartDispacher(creatCartAction(cartActionType.CHECKOUT, data.cart.books));

            setCheckedOut(true);
        } catch (err) {
            console.log(err);
            alert('Something went wrong.');
        }
    };

    const handleClearCart = async () => {
        try {
            const { data } = await clearCart(authContextValue.userToken);
            cartContextValue.cartDispacher(creatCartAction(cartActionType.CLEAR, data.cart.books));
        } catch (err) {
            console.log(err.message);
            alert('Something went wrong.');
        }
    };

    return cartContextValue.cartState.cartItems.length !== 0 ? (
        <>
            <div className="cart-items">
                {cartContextValue.cartState.cartItems.map((book, index) => (
                    <CartItem
                        key={index}
                        id={book.bookRef._id}
                        cover={book.bookRef.bookCover}
                        title={book.bookRef.title}
                        author={book.bookRef.author}
                        price={book.bookRef.price}
                        quantity={book.quantity}
                    />
                ))}
            </div>
            <div className="checkout-container">
                <h2 className="total-price">Total price: {cartContextValue.cartState.totalPrice.toFixed(2)} $ </h2>
                <CstmBtn className="checkout-btn" onClick={handleCheckOut}>
                    Checkout
                </CstmBtn>
            </div>
            <CstmBtn className="clear-btn" onClick={handleClearCart}>
                Clear cart
            </CstmBtn>
        </>
    ) : (
        <>
            {checkedOut ? (
                <h1 className="checkedout-msg">Thank you for your purchase!</h1>
            ) : (
                <h1 className="empty-cart-msg">Your cart is empty</h1>
            )}
        </>
    );
};

export default CartItems;

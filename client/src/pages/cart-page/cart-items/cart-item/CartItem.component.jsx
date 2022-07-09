import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../contexts/Auth.context.jsx';
import { CartContext } from '../../../../contexts/cart.context.jsx';
import CustmBtn from '../../../../components/custom-btn/CstmBtn.component.jsx';
import creatCartAction, { cartActionType } from '../../../../actions/cart.actions.js';
import ItemQuantity from './item-quantity/ItemQuantity.component.jsx';
import { removeBookFromCart } from '../../../../services/cart.service.js';
import './cart-item.style.css';

const CartItem = (props) => {
    const navigate = useNavigate();
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);
    const [price, setPrice] = useState((props.price * props.quantity).toFixed(2));

    const handleRemove = async () => {
        try {
            const { data } = await removeBookFromCart(props.id, authContextValue.userToken);
            cartContextValue.cartDispacher(creatCartAction(cartActionType.REMOVE_BOOK, data.cart.books));
        } catch (err) {
            console.log(err.message);
            alert('Something went wrong');
            navigate('/');
        }
    };

    return (
        <div className="cart-item">
            <div className="img-container">
                <img src={props.cover} alt="" />
            </div>
            <div className="book-details">
                <p className="book-details-text">
                    <b>Book Title:</b>
                    <br />
                    {props.title}
                    <br />
                    <i>
                        <b>Author:</b> <br />
                        {props.author}
                    </i>
                </p>
            </div>
            <div className="book-price">
                <h3>Price:</h3>
                {price} $
                <CustmBtn className="cart-rm-btn" onClick={handleRemove}>
                    Remove
                </CustmBtn>
            </div>

            <ItemQuantity id={props.id} price={props.price} setPrice={setPrice} quantity={props.quantity} />
        </div>
    );
};

export default CartItem;

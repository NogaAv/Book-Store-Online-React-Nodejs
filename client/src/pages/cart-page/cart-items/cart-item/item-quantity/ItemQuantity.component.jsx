import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../../contexts/Auth.context';
import { CartContext } from '../../../../../contexts/cart.context';
import creatCartAction, { cartActionType } from '../../../../../actions/cart.actions.js';
import { decreaseQuantity, increaseQuantity } from '../../../../../services/cart.service.js';
import './item-quantity.style.css';

const ItemQuantity = (props) => {
    const authContextValue = useContext(AuthContext);
    const cartContextValue = useContext(CartContext);

    const [quantity, setQuantity] = useState(props.quantity);
    const bookId = props.id;

    const increase = async () => {
        try {
            const { data } = await increaseQuantity(bookId, authContextValue.userToken);
            const { cart, book } = data;

            cartContextValue.cartDispacher(creatCartAction(cartActionType.UPDATE_QUANTITY, cart.books));
            setQuantity(book.quantity);
            props.setPrice((props.price * book.quantity).toFixed(2));
        } catch (err) {
            console.log(`Failed increasing book quantity: ${err}`);
            alert('Operation failed');
        }
    };

    const decrease = async () => {
        if (quantity <= 1) {
            return;
        }
        try {
            const { data } = await decreaseQuantity(bookId, authContextValue.userToken);
            const { cart, book } = data;
            cartContextValue.cartDispacher(creatCartAction(cartActionType.UPDATE_QUANTITY, cart.books));
            setQuantity(book.quantity);
            props.setPrice((props.price * book.quantity).toFixed(2));
        } catch (err) {
            console.log(`Failed increasing book quantity: ${err}`);
            alert('Operation failed');
        }
    };

    return (
        <div className="item-quantity-container">
            <p>Quantity</p>
            <button onClick={increase}>+</button>
            <div>{quantity}</div>
            <button onClick={decrease}>-</button>
        </div>
    );
};

export default ItemQuantity;

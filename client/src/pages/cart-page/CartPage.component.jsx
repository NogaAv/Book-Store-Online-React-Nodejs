import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context.jsx';
import { CartContext } from '../../contexts/cart.context.jsx';
import creatCartAction, { cartActionType } from '../../actions/cart.actions';
import Loader from '../../components/shared/loader/Loader.component.jsx';
import CartItems from './cart-items/CartItems.component.jsx';
import { getCart } from '../../services/cart.service.js';
import { LOADER_TIMEOUT } from '../../constants/constants.js';
import './cart-page.style.css';

const CartPage = () => {
    const navigate = useNavigate();
    const cartContextValue = useContext(CartContext);
    const authContextValue = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!authContextValue.userToken) {
            navigate('/login');
            return;
        }

        const fetchCart = async () => {
            try {
                const { data } = await getCart(authContextValue.userToken);
                const cart = data.cart;
                cartContextValue.cartDispacher(creatCartAction(cartActionType.INIT_CART, cart.books));

                setTimeout(() => {
                    setIsLoading(false);
                }, LOADER_TIMEOUT);
            } catch (err) {
                alert('Something went wrong: ' + err.message);
                console.log(err.message);
                navigate('/');
            }
        };

        cartContextValue.cartState.totalPrice === -1
            ? fetchCart()
            : setTimeout(() => {
                  setIsLoading(false);
              }, LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="main main-cart-page">
            <CartItems />
        </main>
    );
};

export default CartPage;

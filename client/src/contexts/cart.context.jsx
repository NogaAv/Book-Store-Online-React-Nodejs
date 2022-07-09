import React, { createContext, useReducer } from 'react';
import { CART_INIT_STATE } from '../reducers/cart.reducer.js';
import cartReducer from '../reducers/cart.reducer.js';

export const CartContext = createContext();

const CartContextProvider = (props) => {
    const [cartState, cartDispacher] = useReducer(cartReducer, CART_INIT_STATE);

    const value = {
        cartState: cartState,
        cartDispacher: cartDispacher,
    };
    return <CartContext.Provider value={value}>{props.children}</CartContext.Provider>;
};

export default CartContextProvider;

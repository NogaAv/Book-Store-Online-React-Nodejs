export const cartActionType = {
    INIT_CART: 'INIT_CART',
    ADD_BOOK: 'ADD_BOOK',
    REMOVE_BOOK: 'REMOVE_BOOK',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CHECKOUT: 'CHECKOUT',
    CLEAR: 'CLEAR',
};

const creatCartAction = (type, books) => {
    return {
        type: type,
        payload: {
            cartItems: books,
            totalPrice: 0,
        },
    };
};

export default creatCartAction;

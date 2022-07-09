import { cartActionType } from '../actions/cart.actions';

export const CART_INIT_STATE = {
    cartItems: [],
    totalPrice: -1, //-1: designating the no fetch call executed yet for getting cart info
};

const cartReducer = (state, action) => {
    let totalPrice = 0;
    let itemsCount = 0;

    action.payload.cartItems = action.payload.cartItems.filter((item) => item.bookRef !== null);
    action.payload.cartItems.map((book) => {
        totalPrice = totalPrice + book.bookRef.price * book.quantity;
        itemsCount += book.quantity;
    });

    switch (action.type) {
        case cartActionType.INIT_CART:
        case cartActionType.REMOVE_BOOK:
        case cartActionType.ADD_BOOK:
        case cartActionType.UPDATE_QUANTITY:
        case cartActionType.CHECKOUT:
        case cartActionType.CLEAR:
            return {
                cartItems: action.payload.cartItems,
                totalPrice: totalPrice,
                itemsCount: itemsCount,
            };
        default: {
            return state;
        }
    }
};

export default cartReducer;

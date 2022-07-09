import { API_URL } from '../constants/constants.js';

export const addBookToCart = async (bookID, userToken) => {
    const response = await fetch(`${API_URL}/cart/add-book/${bookID}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const removeBookFromCart = async (bookID, userToken) => {
    const response = await fetch(`${API_URL}/cart/remove-book/${bookID}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};
export const getCart = async (userToken) => {
    const response = await fetch(`${API_URL}/cart`, {
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const checkOut = async (userToken) => {
    const response = await fetch(`${API_URL}/cart/checkout`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const clearCart = async (userToken) => {
    const response = await fetch(`${API_URL}/cart/clear`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const decreaseQuantity = async (bookId, userToken) => {
    const response = await fetch(`${API_URL}/cart/decrease-quantity/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });
    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const increaseQuantity = async (bookId, userToken) => {
    const response = await fetch(`${API_URL}/cart/increase-quantity/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${userToken}`,
        },
    });
    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

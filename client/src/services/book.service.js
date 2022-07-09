import { API_URL } from '../constants/constants.js';

export const createBook = async (data, adminToken) => {
    const response = await fetch(`${API_URL}/book/new`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 201) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const getBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) {
        throw new Error(response.message);
    }
    const payload = await response.json();
    return payload;
};

export const getBook = async (bookID) => {
    const response = await fetch(`${API_URL}/book/${bookID}`);

    if (!response.ok) {
        throw new Error(response.message);
    }

    const payload = await response.json();
    return payload;
};

export const updateBook = async (data, bookId, adminToken) => {
    const response = await fetch(`${API_URL}/book/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 200) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

export const deleteBook = async (bookID, adminToken) => {
    const response = await fetch(`${API_URL}/book/${bookID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const payload = await response.json();
    return payload;
};

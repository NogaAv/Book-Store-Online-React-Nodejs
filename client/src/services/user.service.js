import { API_URL } from '../constants/constants.js';

export const signup = async (data) => {
    const response = await fetch(`${API_URL}/user/signup`, {
        method: 'POST',
        headers: {
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

export const getUserAccount = async (userToken) => {
    const response = await fetch(`${API_URL}/user/accountInfo`, {
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

export const login = async (identity, data) => {
    const response = await fetch(`${API_URL}/${identity}/login`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

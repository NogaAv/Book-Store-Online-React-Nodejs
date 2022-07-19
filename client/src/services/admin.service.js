import { API_URL } from '../constants/constants.js';

export const getAdminAccount = async (adminToken) => {
    const response = await fetch(`${API_URL}/admin/accountInfo`, {
        headers: {
            'Authorization': `Bearer ${adminToken}`,
        },
    });

    if (!response.ok) {
        throw new Error();
    }

    const payload = await response.json();
    return payload;
};

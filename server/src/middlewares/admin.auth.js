import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import environments from '../../config/environments.js';

const authAdmin = async (req, res, next) => {
    try {
        const auth = req.header('Authorization');
        if (!auth) {
            throw new Error('Admin unauthorized');
        }

        const token = auth.replace('Bearer ', '');
        if (!token) {
            throw new Error('Admin unauthorized');
        }

        const tokenPayload = jwt.verify(token, environments.TOKEN_SECRET);
        if (!tokenPayload) {
            throw new Error('Admin unauthorized');
        }

        const admin = await Admin.findOne({ _id: tokenPayload._id, 'tokens.token': token });
        if (!admin) {
            throw new Error('Authorization Failed');
        }

        req.admin = admin;
        req.token = token;

        next();
    } catch (err) {
        next(err);
    }
};

export default authAdmin;

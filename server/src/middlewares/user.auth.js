import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import environments from '../../config/environments.js';

const authUser = async (req, res, next) => {
    try {
        const auth = req.header('Authorization');
        if (!auth) {
            throw new Error('User unauthorized');
        }

        const token = auth.replace('Bearer ', '');
        if (!token) {
            throw new Error('User unauthorized');
        }

        const tokenPayload = jwt.verify(token, environments.TOKEN_SECRET);
        if (!tokenPayload) {
            throw new Error('User unauthorized');
        }

        const user = await User.findOne({ _id: tokenPayload._id, 'tokens.token': token });
        if (!user) {
            throw new Error('Authorization Failed');
        }

        req.user = user;
        req.token = token;

        next();
    } catch (err) {
        res.status(401).send({
            status: 401,
            statusText: 'Unauthorized',
            message: err,
        });
    }
};

export default authUser;

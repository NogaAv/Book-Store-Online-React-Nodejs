import Admin from '../models/admin.model.js';
import { SuccessResponse } from '../models/response.model.js';

export const createAdmin = async (req, res, next) => {
    const adminData = req.body;

    try {
        const admin = new Admin(adminData);
        await admin.save();
        const token = await admin.generateAuthToken();

        res.status(201).send(new SuccessResponse(201, 'Created', "'New admin created successfully", { admin, token }));
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const admin = await Admin.findAdminByEmailAndPassword(req.body.email, req.body.password);
        if (!admin) {
            throw new Error('Failed validating Email and Password');
        }

        const token = await admin.generateAuthToken();
        res.status(200).send(
            new SuccessResponse(200, 'Ok', 'Admin logged in successfully', { admin: admin, token: token })
        );
    } catch (err) {
        next(err);
    }
};

export const logout = async (req, res, next) => {
    let tokens = req.admin.tokens;
    const token = req.token;
    try {
        tokens = tokens.filter((tokenObj) => {
            return tokenObj.token !== token;
        });

        req.admin.tokens = tokens;
        await req.admin.save();
        res.status(200).send(new SuccessResponse(200, 'Ok', 'Logged out succsessfully', {}));
    } catch (err) {
        next(err);
    }
};

export const getAccount = async (req, res, next) => {
    const admin = req.admin;
    try {
        res.status(200).send(
            new SuccessResponse(200, 'Ok', 'Retrieved admin account info successfully', { admin: admin })
        );
    } catch (err) {
        next(err);
    }
};

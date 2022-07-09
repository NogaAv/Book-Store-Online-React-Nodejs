import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import isJWT from 'validator/lib/isJWT.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import environments from '../../config/environments.js';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'FirstName is required'],
        },
        lastName: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'LastName is required'],
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            required: [true, 'E-mail is required'],
            unique: [true, 'E-mail already exist'],
            validate(email) {
                if (!isEmail(email)) {
                    throw new Error('E-mail is invalid');
                }
            },
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password is required'],
            validate(password) {
                if (!isStrongPassword(password)) {
                    throw new Error(
                        'Password is weak. It must contain at least: 8 character, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol'
                    );
                }
            },
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                    validate(token) {
                        if (!isJWT(token)) {
                            throw new Error('Invalid JWT token');
                        }
                    },
                },
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, +environments.SALT);
    }

    next();
});

userSchema.methods.generateAuthToken = async function () {
    const newToken = jwt.sign({ _id: this._id }, environments.TOKEN_SECRET);

    this.tokens.push({ token: newToken });

    await this.save();

    return newToken;
};

userSchema.statics.findUserByEmailAndPassword = async (email, password) => {
    if (!email || !password) return null;

    const user = await User.findOne({ email: email });

    if (!user) {
        throw new Error(`Operation failed!`);
    }

    if (!(await bcrypt.compare(password, user.password))) {
        throw new Error('Operation failed!');
    }

    return user;
};

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.__v;

    return userObject;
};

userSchema.virtual('cart', {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'userID',
});

const User = mongoose.model('User', userSchema);

export default User;

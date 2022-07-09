import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectID,
        ref: 'User',
        required: [true, 'user _id is required'],
    },

    books: [
        {
            bookRef: {
                ref: 'Book',
                type: mongoose.SchemaTypes.ObjectID,
                required: [true, 'book reference required'],
            },
            quantity: {
                type: Number,
                min: 0,
                required: [true, 'book quantity required'],
            },
        },
    ],
});

cartSchema.methods.toJSON = function () {
    const cart = this.toObject();
    delete cart.__v;

    return cart;
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;


import Cart from '../models/cart.model.js';

const findCart = async (req, res, next)=>{

    try{
        const cart = await Cart.findOne({userID: req.user._id});
        if(!cart){
            throw new Error('Could not find user cart');
        }

        req.cart = cart;

        next();

    }catch(err){

        res.status(500).send({
            status: 500,
            statusText: 'Internal server error',
            data: {},
            message: err.message
        });
    }
}

export default findCart;
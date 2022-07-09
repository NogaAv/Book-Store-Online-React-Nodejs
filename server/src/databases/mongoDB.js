import mongoose from 'mongoose';
import environments from '../../config/environments.js';

const mongoDbConnect = async () => {
    try {
        await mongoose.connect(environments.MONGODB_URL);
        console.log('Connected to mongoDB successfully');
    } catch (err) {
        console.log('Failed to connected to mongoDB: ' + err);
        return;
    }
};

export default mongoDbConnect;

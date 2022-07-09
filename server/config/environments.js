import dotenv from 'dotenv';

dotenv.config();


const environments = {
    PORT: process.env.PORT,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    MONGODB_URL: process.env.MONGODB_URL,
    SALT: process.env.SALT
};

export default environments;
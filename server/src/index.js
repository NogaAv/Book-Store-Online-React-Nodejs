import express from 'express';
import environments from '../config/environments.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routers/user.router.js';
import cartRouter from './routers/cart.router.js';
import bookRouter from './routers/book.router.js';
import adminRouter from './routers/admin.router.js';
import mongoDbConnect from './databases/mongoDB.js';
import { logErrors, clientErrorHandler, errorHandler } from './middlewares/error-handlers.js';

const envConfRes = dotenv.config();
if (envConfRes.error) {
    console.log(`Failed configuring environment variable: ${envConfRes.error.message}`);
    process.exit(1);
}

const PORT = environments.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(adminRouter);
app.use(cartRouter);
app.use(bookRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server is up and running on port: ${PORT}`);

    mongoDbConnect();
});

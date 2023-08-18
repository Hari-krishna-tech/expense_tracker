import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';



import connectDB from './model/db.js';
import authRouter from './auth/auth.js';
import expenseRouter from './expense/expense.js';
import loggerMiddleware from './middleware/loggerMiddleware.js';
import responseLoggerMiddleware from './middleware/responseLoggerMiddleware.js';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: true,
    credentials: 'include',
}));
app.use(loggerMiddleware)
app.use(responseLoggerMiddleware)


// auth
app.use('/api', authRouter);

// create expense 
app.use('/api', expenseRouter);

app.listen(8000, ()=> {
    connectDB();
    console.log('Server is running on port 8000');
})
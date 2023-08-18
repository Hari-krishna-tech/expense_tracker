import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();



import connectDB from './model/db.js';
import authRouter from './auth/auth.js';


const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// auth

app.use('/api', authRouter);



app.listen(8000, ()=> {
    connectDB();
    console.log('Server is running on port 8000');
})
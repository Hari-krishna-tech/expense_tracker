import express from 'express';
import jwt from 'jsonwebtoken';

import ExpenseTracker from '../model/ExpenseTracker.js';


const router = express.Router();


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const expirationSeconds = 60 * 60 * 24 * 7; // one week
    const cookieExpiration = Date.now() + expirationSeconds * 1000;

    // Check if username and password are set
    if (username && password) {
        // Check if user with the same credentials exists in the database
        const expenseTracker = await  ExpenseTracker.findOne({ email: email })
        if (user) {
            // Generate an access token
            const accessToken = jwt.sign({email}, process.env.JWT_SECRET);
            
            // Send the access token to the client inside a cookie
            res.cookie('token', accessToken, {
                expires: new Date(cookieExpiration),
                httpOnly: true,
            });

            res.send('You are logged in');


        } else {
            res.send('Username or password incorrect');
        }
    } else {
        res.send('Username or password missing');
    }
});

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const expirationSeconds = 60 * 60 * 24 * 7; // one week
    const cookieExpiration = Date.now() + expirationSeconds * 1000;

    // Check if username and password are set
    if (username && password) {
        // Check if user with the same username exists in the database
        const expenseTracker = await ExpenseTracker.findOne({ email })
        if (user) {
            res.send('Tracker Already Exists');
        } else {
            // Create a new user
            const expenseTracker = new ExpenseTracker({ username, email, password });
            await expenseTracker.save();

            res.cookie('token', accessToken, {
                expires: new Date(cookieExpiration),
                httpOnly: true,
            });

            res.send('User created');
        }
    } else {
        res.send('Username or password missing');
    }
});

export default router;
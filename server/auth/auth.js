import express from 'express';
import jwt from 'jsonwebtoken';

import ExpenseTracker from '../model/ExpenseTracker.js';


const router = express.Router();


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const expirationSeconds = 60 * 60 * 24 * 7; // one week
    const cookieExpiration = Date.now() + expirationSeconds * 1000;

    // Check if username and password are set
    if (email && password) {
        // Check if user with the same credentials exists in the database
        const expenseTracker = await  ExpenseTracker.findOne({ email: email })
        if (expenseTracker) {
            // Generate an access token
            const accessToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
            
            // Send the access token to the client inside a cookie
            res.status(200).json({token: accessToken});

           


        } else {
            res.status(400).send('Username or password incorrect');
        }
    } else {
        res.status(400).res.send('Username or password missing');
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
        if (expenseTracker) {
            res.status(400).send('Tracker Already Exists');
        } else {
            // Create a new user
            const expenseTracker = new ExpenseTracker({ username, email, password });
            await expenseTracker.save();
            const accessToken = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});
            res.status(200).send({token: accessToken});
        }
    } else {
        res.status(400).send('Username or password missing');
    }
});

export default router;
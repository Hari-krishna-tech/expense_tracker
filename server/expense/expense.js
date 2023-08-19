import express from 'express';

import ExpenseTracker from '../model/ExpenseTracker.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { ExpenseModel } from '../model/ExpenseTracker.js';

const router = express.Router();


router.get('/categories', authMiddleware, async (req, res) => {
  const { email } = req;
  try {
    const expenseTracker = await ExpenseTracker.findOne({ email });
    const categories = expenseTracker.categories;
    res.json(categories);

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

});

router.post("/categories", authMiddleware, async (req, res) => {
  const { email } = req;

  try {
    const expenseTracker = await ExpenseTracker.findOne({email});

    expenseTracker.categories.push(req.body.category);
    await expenseTracker.save();

    res.json(expenseTracker.categories);

  } catch(error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.delete("/categories", authMiddleware, async (req, res) => {
  const { email } = req;
  const { index } = req.body;

  try {
    const expenseTracker = await ExpenseTracker.findOne({email});

    expenseTracker.categories.splice(index, 1);
    await expenseTracker.save();

    res.json(expenseTracker.categories);

  } catch(error) {
    res.status(500).json({ message: 'Server Error' });
  }

});

router.get("/expensetotal", authMiddleware, async (req, res) => {
  const { email } = req;
  try {
    const expenseTracker = await ExpenseTracker.findOne({ email });
    const expenses = expenseTracker.expense;
    const aggregatedExpenses = {};

    expenses.forEach((expense) => {
      if (!aggregatedExpenses[expense.type]) {
        aggregatedExpenses[expense.type] = {
          totalAmount: expense.amount,
        };
      } else {
        aggregatedExpenses[expense.type].totalAmount += expense.amount;
      }
    });

    res.json(aggregatedExpenses);

  } catch(error) {
    res.status(500).json({ message: 'Server Error' });
  }

});

router.get('/expense', authMiddleware, async (req, res) => {
    const { email } = req;
    const { month, year } = req.body;
    
    if(!month || !year) return res.status(400).send('Invalid request');
    try {
        const expenseTracker = await ExpenseTracker.findOne({ email });
        const aggregatedExpenses = {};
        const expenses = expenseTracker.expense;

        const filteredExpenses = expenses.filter((expense) => {
          return expense.date.getFullYear() === year && expense.date.getMonth() + 1 === month;
        });
        
        filteredExpenses.forEach((expense) => {
          if (!aggregatedExpenses[expense.type]) {
            aggregatedExpenses[expense.type] = {
              totalAmount: expense.amount,
            };
          } else {
            aggregatedExpenses[expense.type].totalAmount += expense.amount;
          }
        });


        res.json(aggregatedExpenses);


    } catch (error) {
        console.log(error);
        res.send('Error');
    }
});

router.post('/create',authMiddleware, async (req, res) => {
    const expense = req.body;
    const { email } = req;
    const newExpense = ExpenseModel(expense);
    console.log(newExpense);
    try {
        const expenseTracker = await ExpenseTracker.findOne({ email })
        // const expenseDb= await ExpenseTracker.findOne({ email });
        // expense["date"] = new Date();
        expenseTracker.expense.push(expense);
        await expenseTracker.save();
       // console.log(expenseDb);
        res.json("Expense Added");

    } catch (error) {
        console.log(error);
        res.send('Error');
    }
});




export default router;
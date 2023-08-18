
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const expenseTrackerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  
});

expenseTrackerSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash){
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});


const ExpenseTracker = mongoose.model('ExpenseTracker', expenseTrackerSchema);

export default ExpenseTracker;

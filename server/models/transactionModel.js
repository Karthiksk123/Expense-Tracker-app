import mongoose from "mongoose";

const transactionModel = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
  },
  type: {
    type: String,
    default: "Investments",
  },
  amount: {
    type: Number,
  },
  date:{
    type:Date,
    default:Date.now
  }
});

const transactions = mongoose.model('transactions', transactionModel);

export default transactions;

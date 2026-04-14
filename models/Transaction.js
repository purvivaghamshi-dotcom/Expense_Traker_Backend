import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  type: String,
  userId: String
});
export default mongoose.model("Transaction", transactionSchema);
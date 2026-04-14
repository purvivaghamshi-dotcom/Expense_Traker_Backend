import mongoose from "mongoose";
const budgetSchema = new mongoose.Schema({
  category: String,
  limit: Number,
  userId: String,
});
export default mongoose.model("Budget", budgetSchema);
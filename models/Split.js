import mongoose from "mongoose";
const splitSchema = new mongoose.Schema({
  title: String,
  totalAmount: Number,
  paidBy: String,
  userId: String,   // 🔥 IMPORTANT FIX
  participants: [
    {
      name: String,
      owes: Number,
      settled: Boolean
    }
  ]
});
export default mongoose.model("Split", splitSchema);
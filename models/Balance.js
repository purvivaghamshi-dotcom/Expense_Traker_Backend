import mongoose from "mongoose";
const balanceSchema = new mongoose.Schema({
  userId: String,
  amount: { type: Number, default: 0 }
});
export default mongoose.model("Balance", balanceSchema);
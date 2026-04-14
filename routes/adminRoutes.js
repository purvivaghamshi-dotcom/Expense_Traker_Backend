import express from "express";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import Split from "../models/Split.js";
import Balance from "../models/Balance.js";
const router = express.Router();
router.get("/users", async (req, res) => {
  try {
 const users = await User.find();
 res.json(users);
  } catch (err) {
 res.status(500).json({ error: err.message });
  }
});
router.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const transactions = await Transaction.find({ userId });
    const budgets = await Budget.find({ userId });
    const splits = await Split.find({ userId });
    const balance = await Balance.findOne({ userId });
    res.json({
   user,
    transactions: transactions || [],      budgets: budgets || [],
      splits: splits || [],
      balance: balance || { amount: 0 }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Transaction.deleteMany({ userId: req.params.id });
    await Budget.deleteMany({ userId: req.params.id });
    await Split.deleteMany({ userId: req.params.id });
    await Balance.deleteMany({ userId: req.params.id });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
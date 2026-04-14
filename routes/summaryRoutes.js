import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        income += Number(t.amount);
      } else {
        expense += Number(t.amount);
      }
    });

    res.json({ income, expense });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
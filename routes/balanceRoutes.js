import express from "express";
import Balance from "../models/Balance.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;

  let balance = await Balance.findOne({ userId });

  if (!balance) {
    balance = await Balance.create({ userId, amount: 0 });
  }

  res.json(balance);
});

router.post("/set", async (req, res) => {
  try {
    const { userId, amount } = req.body;

    let balance = await Balance.findOne({ userId });

    if (!balance) {
      balance = await Balance.create({ userId, amount: 0 });
    }

    balance.amount = Number(amount);

    await balance.save();

    res.json(balance);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
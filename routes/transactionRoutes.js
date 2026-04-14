import express from "express";
import Transaction from "../models/Transaction.js";
import Balance from "../models/Balance.js";

const router = express.Router();

/* GET */
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const data = await Transaction.find({ userId });
  res.json(data);
});

/* ADD TRANSACTION */
router.post("/", async (req, res) => {
  try {
    let { title, amount, type, userId } = req.body;

    amount = Number(amount);

    const txn = await Transaction.create({
      title,
      amount,
      type,
      userId
    });

    let balance = await Balance.findOne({ userId });

    if (!balance) {
      balance = await Balance.create({ userId, amount: 0 });
    }

    if (type === "income") {
      balance.amount += amount;
    } else {
      balance.amount -= amount;
    }

    await balance.save();

    res.json(txn);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE TRANSACTION */
router.delete("/:id", async (req, res) => {
  const txn = await Transaction.findById(req.params.id);

  let balance = await Balance.findOne({ userId: txn.userId });

  if (balance) {
    if (txn.type === "income") {
      balance.amount -= txn.amount;
    } else {
      balance.amount += txn.amount;
    }

    await balance.save();
  }

  await Transaction.findByIdAndDelete(req.params.id);

  res.json({ message: "deleted" });
});

export default router;
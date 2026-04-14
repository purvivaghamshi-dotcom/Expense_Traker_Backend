import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const data = await Budget.find({ userId });
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const { category, limit, userId } = req.body;

    const budget = new Budget({
      category,
      limit,
      userId
    });

    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  await Budget.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
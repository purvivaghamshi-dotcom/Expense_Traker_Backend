import express from "express";
import Split from "../models/Split.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    const data = await Split.find({ userId });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const split = new Split({
      ...req.body,
      userId: req.body.userId
    });

    await split.save();
    res.json(split);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Split.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
const express = require("express");
const app = express();
const port = 5050;

// Middleware to parse JSON
app.use(express.json());

const cors = require("cors");
app.use(cors());

// Simple GET API
app.get("/", (req, res) => {
  res.send("Welcome to my Express API!");
});

// GET API to return some sample data
app.get("/api/data", (req, res) => {
  res.json({
    message: "Hello from the API!",
    data: ["Item 1", "Item 2", "Item 3"],
  });
});

// POST API to accept and return user input
app.post("/api/data", (req, res) => {
    const { item } = req.body;
    if (!item) {
      return res.status(400).json({ error: "Item is required" });
    }
    res.json({ message: "Success", data: [item] });
  });

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

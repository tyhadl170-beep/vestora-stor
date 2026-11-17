
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

const authRoutes = require("./auth");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    store: "VESTORA",
    message: "Welcome to VESTORA Store",
    status: "running"
  });
});

app.get("/api/products", (req, res) => {
  res.json([]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`VESTORA server running on port ${PORT}`);
});

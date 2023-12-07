/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const routes = require("./routes/index.js");
const PORT = process.env.PORT;
const path = require("path");
const { createClient } = require("redis");
const redisClient = createClient();

const midtransClient = require("midtrans-client");

(async () => {
  await redisClient.connect();
})();

redisClient.on("ready", () => {
  console.log("redis connected successfully!");
});
redisClient.on("error", (err) => {
  console.log("Error in the Connection", err);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});
app.use((req, res, next) => {
  req.snap = snap;
  next();
});

app.use("/api", routes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "API Not Found" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

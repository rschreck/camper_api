const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");

ntlm = require("express-ntlm");
dotenv.config({
  path: "./config/config.env",
});

const apidocs = fs.readFileSync("./docs/apidocs.json");

const PORT = process.env.PORT || 4002;
app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});
app.get("/v1/bootcamps", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Show all bootcamps", data: [] });
});
app.post("/v1/bootcamps", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Create new bootcamp", data: [] });
});
app.put("/v1/bootcamps/:id", (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp - ${id}`, data: [] });
});
app.get("/v1/bootcamps/:id", (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Get bootcamp - ${id}`, data: [] });
});
app.delete("/v1/bootcamps/:id", (req, res) => {
  const { id } = req.params;
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp - ${id}`, data: [] });
});
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
module.exports = app;

const express = require("express");
const app = express();
//Body Parser
app.use(express.json());
const dotenv = require("dotenv");
const colors = require("colors");
const fs = require("fs");
const connectDB = require("./config/db");
//Route files
const bootcamps = require("./routes/bootcamp");
const root = require("./routes/root");
//get db
ntlm = require("express-ntlm");
dotenv.config({
  path: "./config/config.env",
});
connectDB();
app.use("/", root);
app.use("/v1/bootcamps", bootcamps);
const apidocs = fs.readFileSync("./docs/apidocs.json");

const PORT = process.env.PORT || 4002;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
//handle unhandled conditions
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
module.exports = app;

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const fs = require("fs");
//Route files
const bootcamps = require("./routes/bootcamp");
const root = require("./routes/root");
ntlm = require("express-ntlm");
dotenv.config({
  path: "./config/config.env",
});
app.use("/", root);
app.use("/v1/bootcamps", bootcamps);
const apidocs = fs.readFileSync("./docs/apidocs.json");

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
module.exports = app;

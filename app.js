const express = require("express");
const app = express();
const router = express.Router();
//Body Parser
app.use(express.json());
const dotenv = require("dotenv");
const colors = require("colors");
const fs = require("fs");
const connectDB = require("./models/db");
//Route files
const bootcamps = require("./routes/bootcamp");
const root = require("./routes/root");
const { errorHandler } = require("./middleware/errorHandler");
//get db
ntlm = require("express-ntlm");
dotenv.config({
  path: "./config/config.env",
});

connectDB();

// a middleware function with no mount path. This code is executed for every request to the router
app.use(function (req, res, next) {
  console.log(`url: ${req.url}, method:${req.method}`);
  next();
});
app.use("/", root);
app.use("/v1/bootcamps", bootcamps);

const apidocs = fs.readFileSync("./docs/apidocs.json");
app.use(errorHandler);

const PORT = process.env.PORT || 4002;
const server = app.listen(PORT, () => {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});
//handle unhandled conditions
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error ${err.message}`.red.bold);
//   server.close(() => {
//     process.exit(1);
//   });
// });
module.exports = app;

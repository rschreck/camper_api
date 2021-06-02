const express = require("express");
const app = express();
const router = express.Router();
//Body Parser
app.use(express.json());
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const fileupload = require("express-fileupload");
const fs = require("fs");
const connectDB = require("./models/db");
//Route files
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const root = require("./routes/root");
const { errorHandler } = require("./middleware/errorHandler");
const { static } = require("express");
//get db
ntlm = require("express-ntlm");
dotenv.config({
  path: "./config/config.env",
});

connectDB();
//add fileupload
app.use(fileupload());
//set static folder for publics
app.use(express.static(path.join(__dirname, "public")));

// a middleware function with no mount path. This code is executed for every request to the router
app.use(function (req, res, next) {
  console.log(`url: ${req.url}, method:${req.method}`);
  next();
});
app.use("/", root);
app.use("/v1/bootcamps", bootcamps);
app.use("/v1/courses", courses);
app.use("/v1/auth", auth);

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

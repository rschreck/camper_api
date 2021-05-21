const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
//load env vars
dotenv.config({ path: "../../config/config.env" });
//load models

const Bootcamp = require("../../models/Bootcamp");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
//Read JSON files

const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/bootcamps.json`, "utf-8")
);
console.log(`bootcamps ${bootcamps.length}`);
console.log(`process.argv[2] ${process.argv[2]}`);

//Import into DB
//Delete from DB
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    console.log(`Data Deleted...`.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    console.log(`Data Imported...`.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};
if (process.argv[2] === "-i") {
  console.log(`importing`);
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}

const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI);
    console.log("Db is up and running successfully");
  } catch (error) {
    console.log("DB Connection Error");
  }
};

module.exports = { db };

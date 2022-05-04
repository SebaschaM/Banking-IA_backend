const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECT);
    console.log("Successful connection");
  } catch (error) {
    console.log(error);
    throw new Error("Error connection");
  }
};

module.exports = { dbConnection };

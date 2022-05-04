require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/db.js");

const app = express();
dbConnection();
app.use(express.json());
app.use(cors());

app.use("/public", express.static(`${__dirname}/storage`));
app.use("/auth", require("./routes/auth.js"));

app.listen(process.env.PORT, () => {
  console.log(`Runnning on port ${process.env.PORT}`);
});

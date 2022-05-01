const express = require('express');

require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/db.js');

const app = express();
dbConnection();
app.use(cors());


app.listen(process.env.PORT, () => {
  console.log(`Runnning on port ${process.env.PORT}`);
});
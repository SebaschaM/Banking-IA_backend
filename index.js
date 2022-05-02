const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/db.js');

const app = express();
dbConnection();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/auth', require('./routes/auth.js'));

//.use('/img:id', require('./routes/img.js'));

app.listen(process.env.PORT, () => {
    console.log(`Runnning on port ${process.env.PORT}`);
});
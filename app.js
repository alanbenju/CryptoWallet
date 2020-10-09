const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const url = process.env.MONGO_URL || 'mongodb://localhost:27017/node-server'
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

console.log("Mongo url:",url)

// Connect to MongoDB
mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const port = 3000;

const user = require('./routes/user.route');
app.use('/user', user);

const crypto = require('./routes/crypto.route');
app.use('/crypto', crypto);

const deposit = require('./routes/deposit.route');
app.use('/deposit', deposit);

const order = require('./routes/order.route');
app.use('/order', order);

const symbolBalance = require('./routes/symbolBalance.route');
app.use('/symbolBalance', symbolBalance);

app.listen(port, () => console.log('Server running...'));

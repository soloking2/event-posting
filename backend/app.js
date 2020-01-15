const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const app = express();
mongoose.connect("mongodb+srv://soloking2:soloking2@cluster0-2p0fa.mongodb.net/test?retryWrites=true&w=majority").then(() => console.log('Connected to Database')).catch(() => console.log('Connection failed'));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})


app.use('/api/posts', postsRoutes);



module.exports = app;

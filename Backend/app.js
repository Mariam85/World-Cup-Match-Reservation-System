const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors")
const dotenv=require("dotenv").config();

const database = require('./database');
const port = process.env.PORT || 3001;

var users = require('./routes/users');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var manager = require('./routes/manager');
var customer = require('./routes/customer');

var corsOptions = {    
    allowedHeaders: ['authToken'],
    exposedHeaders: ['authToken'],
    preflightContinue: true,
    optionsSuccessStatus: 200 
}

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.options('*', cors())
app.use(cors(corsOptions));

app.use('/users', users);
app.use('/auth',auth);
app.use('/admin',admin);
app.use('/manager',manager);
app.use('/fan',customer);

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
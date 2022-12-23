const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config=require("config");
const cors = require("cors")

if (!config.get('jwtPrivateKey')) {
    console.error('fatal error: jwtPrivateKey is undefined.'); // $env:WorldCup_jwtPrivateKey="mySecureKey"
    // $env:jwtPrivateKey="mySecureKey"
    process.exit(1);
}

const databse = require('./database');
const port = process.env.PORT || 3000;
 
var users = require('./routes/users');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var manager = require('./routes/manager');
var customer = require('./routes/customer');

app.use(express.json()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/users', users);
app.use('/auth',auth);
app.use('/admin',admin);
app.use('/manager',manager);
app.use('/fan',customer);

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
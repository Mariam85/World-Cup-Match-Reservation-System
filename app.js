const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const config=require("config");

if (!config.get('jwtPrivateKey')) {
    console.error('fatal error: jwtPrivateKey is undefined.'); // $env:WorldCup_jwtPrivateKey="mySecureKey"
    process.exit(1);
}

const databse = require('./database');
const port = process.env.PORT || 3000;

var stadiums = require('./routes/venues');    
var users = require('./routes/users');
var teams = require('./routes/teams');
var seats = require('./routes/seats');
var matches = require('./routes/matches');
var auth = require('./routes/auth');

app.use(express.json()); // For applying middleware functions. 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', users);
app.use('/auth',auth)
const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
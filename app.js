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

var stadiums = require('./components/Venues/venues');    
var users = require('./components/Users/users');
var teams = require('./components/Teams/teams');
var seats = require('./components/Seats/seats');
var matches = require('./components/Matches/matches');
var auth = require('./components/Auth/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/users', users);
app.use('/auth',auth)
const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));

module.exports = server
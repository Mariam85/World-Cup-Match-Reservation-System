const express = require('express');
const app = express();
const databse = require('./database');

const port = process.env.PORT || 3000;

const server = app.listen(port,()=>
    console.log(`app is running on port ${port}`));


var stadiums = require('./components/Venues/venues');    
var users = require('./components/Users/users');
var teams = require('./components/Teams/teams');
var seats = require('./components/Seats/seats');
var matches = require('./components/Matches/matches');

module.exports = server
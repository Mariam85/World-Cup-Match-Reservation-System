const mongoose = require('mongoose');

const matchesSchema = new mongoose.Schema({
    linesMen: [{type: String}],
    mainReferee:{type: String},
    venue: { type: mongoose.Schema.Types.ObjectId, ref:'Venue'},
    seats: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Seat'}], 
    dateAndTime: {type: Date} // ISO date. ex:Sat, 21 May 2022 00:00:00 GMT
},{timestamps: true});

const Match= mongoose.model('Match',matchesSchema);
module.exports = Match;
const mongoose = require('mongoose');

const matchesSchema = new mongoose.Schema({
    linesMen: [{type: String}],
    mainReferee:{type: String},
    venue: { type: mongoose.Schema.Types.ObjectId, ref:'Venue'},
    seats: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Seat'}], 
    dateAndTime: {type: Date} // ISO date.
},{timestamps: true});

const Match= mongoose.model('Match',matchesSchema);
module.exports = Match;
const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    name:{type:String},
    seatsPerRow: {type: Number},
    numberOfRows:{type: Number},
    matchesBooked: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Match'}] 
},{timestamps: true});

const Venue = mongoose.model('Venue',venueSchema);
module.exports = Venue;
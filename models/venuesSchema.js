const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    seatsPerRow: {type: Number},
    numberOfSeats:{type: Number},
    matchesBooked: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Match'}] 
},{timestamps: true});

const Venue = mongoose.model('Venue',venueSchema);
module.exports = Venue;
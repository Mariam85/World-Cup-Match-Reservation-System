const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
    reserved:{type:Boolean},
    seatNumber:{type:Number}, // Used for displaying the reserved and taken seats in order.
    match: { type: mongoose.Schema.Types.ObjectId ,ref:'Match'}, 
    ticketNumber:{type:Number,unique:true} // Unique number for reserving a seat for a specific match in a specific stadium.
},{timestamps: true});

const Seat= mongoose.model('Seat',seatsSchema);
module.exports = Seat;
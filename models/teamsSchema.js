const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    matches:[{ type: mongoose.Schema.Types.ObjectId ,ref:'Match'}], //matches the team is playing in.
},{timestamps: true});

const Team= mongoose.model('Team',teamsSchema);
module.exports = Team;
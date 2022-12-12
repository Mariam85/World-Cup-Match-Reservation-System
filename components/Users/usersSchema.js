const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new mongoose.Schema({
    userName: { type :String, unique: true},
    firstName: {type :String ,required :true},
    lastName: {type :String ,required :true},
    email: { type :String},
    password: {type: String},
    role:{ type:String ,enum: ['Fan','Admin','Manager'],default:'Fan'},
    birthdate:{type: Date},
    nationality: {type: String},
    gender: {type: String},
    reservedSeats: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Seat'}] //tickets array
},{timestamps: true});



const User= mongoose.model('User',usersSchema);
module.exports = User;
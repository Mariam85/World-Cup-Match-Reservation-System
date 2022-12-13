const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new mongoose.Schema({
    userName: { type :String, unique: true,required :true},
    firstName: {type :String ,required :true},
    lastName: {type :String ,required :true},
    email: { type :String,required :true},
    password: {type: String,required :true}, // Hashed password.
    role:{ type:String ,enum: ['Fan','Admin','Manager'],default:'Fan'},
    birthdate:{type: Date,required :true},
    nationality: {type: String},  //optional
    gender: {type: String, required :true},
    reservedSeats: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Seat'}] //tickets array
},{timestamps: true});



const User= mongoose.model('User',usersSchema);
module.exports = User;
const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new mongoose.Schema({
    userName: { type :String, unique: true,required :true},
    firstName: {type :String ,required :true},
    lastName: {type :String ,required :true},
    email: { type :String,required :true},
    password: {type: String,required :true}, // Hashed password.
    role:{ type:String ,enum: ['Fan','Admin','Manager'],default:'Fan'},
    birthdate:{type: String,required :true},
    nationality: {type: String},  //optional
    gender: {type: String, required :true},
    reservedSeats: [{ type: mongoose.Schema.Types.ObjectId ,ref:'Seat'}], //tickets array
    wantsAuthority:{type:Boolean,required: true,default:false} // Represents whether or not the user requests to be a manager. 
},{timestamps: true});

// Generating an authentication token.
usersSchema.methods.createAuthToken= function(){
    const token = jwt.sign({_id:this._id,role:this.role},process.env.mySecureKey);
    return token;
}


const User= mongoose.model('User',usersSchema);
module.exports = User;

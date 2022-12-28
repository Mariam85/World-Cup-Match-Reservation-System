const mongoose=require("mongoose")

class Database{
    constructor(){
        this.connect();
    }
    connect(){
        //Global: mongodb+srv://WorldCupReservation:WorldCupReservation123@cluster0.0q2w9f0.mongodb.net/test
        //Local: mongoose.connect("mongodb://127.0.0.1/WorldCupDB")
        mongoose.connect("mongodb+srv://WorldCupReservation:WorldCupReservation123@cluster0.0q2w9f0.mongodb.net/test")
        .then(()=> console.log('Successfully connected to MongoDB'))
        .catch(err => console.error(err))
    }
}
module.exports = new Database();
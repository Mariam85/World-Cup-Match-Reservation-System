const mongoose=require("mongoose")

class Database{
    constructor(){
        this.connect();
    }
    connect(){
        mongoose.connect("mongodb://127.0.0.1/WorldCupDB")
        .then(()=> console.log('Successfully connected to MongoDB'))
        .catch(err => console.error(err))
    }
}
module.exports = new Database();
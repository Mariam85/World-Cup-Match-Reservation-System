const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersSchema');
const Seats=require('../models/seatsSchema');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Remove an existing user.
router.delete('/deleteCustomer/:customerId',[auth,admin],async(req,res)=>{
    // Removes customer from users. 
    // If the customer reserved any seats make them unreserved in "Seat".

    // Searching for the customer to remove. 
    var reservedSeatsArray=[];   
    var userFound = await User.findById(req.params.customerId);
    try{
        if(!userFound){
            return res.status(404).send("The customer you are trying to delete is not found.");
        }
        else
        {
            reservedSeatsArray = userFound.reservedSeats;
            if(reservedSeatsArray)
            {
                if(reservedSeatsArray.length>0)
                { // Changing the states of the seats reserved by the customer to unreserved.
                    var result = await Seats.updateMany({ _id: { $in: reservedSeatsArray }},{reserved:false});
                    if(result.matchedCount != reservedSeatsArray.length)
                    {
                        return res.status(400).send("Failed to unreserve the seats"); 
                    }
                }
            } 
            // Removing the customer from users.
            User.deleteOne({"_id": req.params.customerId}).exec().then(function() {
                return res.status(202).send("Successfully deleted the customer.");
            }, function(err) {
                return res.status(500).send("Failed to delete the user");
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error.");
    }
})

// Approve new users as an authority.
// If a user wants to be a manager,the admin has to accept or reject.
router.put('/approveAuthority',[auth,admin],async(req,res)=>{
    try 
    {
        let newManagers= await User.updateOne({ _id: req.query.id,wantsAuthority:true},{ $set:{'role':'Manager','wantsAuthority':'false'}});
        if(!newManagers)
        {
            return res.status(500).send("Internal Server error.");
        }
        else if(newManagers.modifiedCount>0)
        {
            let projection={"_id":1,"userName":1,"firstName":1,"lastName":1,"email":1,"role":1,"birthdate":1,"nationality":1,"gender":1,"reservedSeats":1};
            var updatedUser = await User.findById(req.query.id).select(projection);
            if(updatedUser)
            {
                return res.status(201).send(updatedUser); // Approved the requests.
            }
            else
            {
                return res.status(500).send("Internal Server error");
            }           
        }
        else
        {
            return res.status(404).send('No users requesting authority were found.');   
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
});


// Getting the users that have requested authority:
router.get('/fansRequestingAuthority',[auth,admin],async(req,res)=>{

    try{
        let projection={"_id":1,"userName":1,"firstName":1,"lastName":1,"email":1,"role":1,"birthdate":1,"nationality":1,"gender":1,"reservedSeats":1};
        var usersRequesting = await User.find({wantsAuthority:true}).select(projection);
        if(!usersRequesting)
        {
            return res.status(500).send("Internal Server error.");
        }
        else if(usersRequesting.length>0)
        {
            return res.status(201).send(usersRequesting);
        }
        else
        {
            return res.status(404).send('There are no users requesting authority.');   
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error.");
    }
});

module.exports = router;
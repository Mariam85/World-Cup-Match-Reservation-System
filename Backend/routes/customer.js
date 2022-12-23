const express = require('express');
const mongoose=require("mongoose")
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersSchema');
const Seats=require('../models/seatsSchema');
const auth = require('../middleware/auth');
const manager = require('../middleware/manager');
const Team=require('../models/teamsSchema');
const Stadium=require('../models/venuesSchema');
const Match=require('../models/matchesSchema');
const uuid = require('uuid');
const _ = require('lodash');
const { findById } = require('../models/usersSchema');

function allLetters(fullString){
    return /^[a-zA-Z]+$/.test(fullString);
}

//  View vacant/reserved seats for each match.
router.get('/viewSeats/:matchId',auth,async(req,res)=>{
    try{
        if(!req.params.matchId )
        {
            return res.status(400).send("No match id was provided.");         
        }
        if(req.params.matchId==":matchId")
        {
            return res.status(400).send("No match id was provided.");  
        }    
        var matchFound = await Match.findById(req.params.matchId);
        if(!matchFound)
        {
            return res.status(404).send("The match with this id is not found.");        
        }
        else
        {
            var matchSeatsArray=[];
            var seatsIDs=matchFound.seats;
            for(i=0;i<seatsIDs.length;i++)
            {
                const seatsInfo= await Seats.findById(seatsIDs[i]).select({"seatNumber":1,"reserved":1,"_id":0});
                matchSeatsArray.push(seatsInfo);
            }
            return res.status(200).send(matchSeatsArray);
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
});

// The customer can edit their personal data (except for the username and email address).
router.patch('/editProfile',auth,async(req,res)=>{
try{    
    // Checking that not all the body parameters are null.
    if(req.body.firstName==null && req.body.lastName==null && req.body.password==null && req.body.birthdate==null && req.body.nationality==null && req.body.gender==null)
    {
        return res.status(400).send("No body parameters were given.")
    }

    var userID =req.user._id;
    var foundUser=await User.findById(userID);
    if(!foundUser)
    {
        return res.status(400).send("This user does not exist.")
    }
    var newFirstName=foundUser.firstName; 
    var newLastName=foundUser.lastName; 
    var newPassword=foundUser.password;
    var newBirthDate=foundUser.birthdate;
    var newNationality=foundUser.nationality;
    var newGender=foundUser.gender;

    // Validating the parameters the user is editing.
    if(req.body.firstName)
    {
        if(req.body.firstName.length>0 && req.body.firstName.length<51 && allLetters(req.body.firstName))
        {
            newFirstName= req.body.firstName;
        }
        else
        {
            return res.status(400).send("The firstname entered is invalid.")
        }
    }
    if(req.body.lastName)
    {
        if(req.body.lastName.length>0 && req.body.lastName.length<51 && allLetters(req.body.lastName))
        {
            newLastName= req.body.lastName;
        }
        else
        {
            return res.status(400).send("The lastname entered is invalid.")
        }
    }
    if(req.body.password)
    {
        if(req.body.password.length>7 && req.body.password.length<51)
        {
            const salt=await bcrypt.genSalt(10);
            newPassword= await bcrypt.hash(req.body.password,salt)
        }
        else
        {
            return res.status(400).send("The password entered is invalid.")
        }
    }
    if(req.body.birthdate)
    {
        var validDate=((new Date(req.body.birthdate)!=="Invalid Date") && !isNaN(new Date(req.body.birthdate)));
        if(!validDate)
        {
            return res.status(400).send("The birthdate entered is invalid.")
        }
        newBirthDate=req.body.birthdate;
    }
    if(req.body.nationality)
    {
        if(req.body.nationality.length>50 || !allLetters(req.body.nationality))
        {
            return res.status(400).send("The nationality entered is invalid.")
        }   
        newNationality=req.body.nationality;    
    }    
    if(req.body.gender)
    {
        if(req.body.gender!="male" && req.body.gender!="female")
        {
            return res.status(400).send("The gender entered is invalid.")
        }
        newGender=req.body.gender;   
    }

    // Updating the user's data.
    var result = await User.findByIdAndUpdate(userID,
        {"firstName":newFirstName,"lastName":newLastName,"password":newPassword,"birthdate":newBirthDate,"nationality":newNationality,"gender":newGender}
    );

    if(!result)
    {
        return res.status(400).send("Failed to edit the user's data.")
    }
    return res.status(200).send("Successfully edited the user's data.")
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

// get reserved seats.
router.get('/reservedSeats',auth,async(req,res)=>{
try{
    const userFound = await User.findById(req.user._id);
    if(!userfound)
    {
        return res.status(400).send("The user logged in is not found.");
    }

    const seats=userFound.reservedSeats;
    if(!seats)
    {
        return res.status(400).send("No reserved seats were found.");
    }
    if(seats.length==0)
    {
        return res.status(400).send("No reserved seats were found.");
    }
    var seatsInfo= await Seats.find({_id:{$in:seats}}).select({"_id":0,"seatNumber":1,"ticketNumber":1});
    res.status(200).send(seatsInfo);
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

//Cancel a reservation 
//The customer can cancel a reserved ticket only 3 days before the start of the event.The seat/s in the reservation should be vacant again
router.delete('/cancelReservation/:ticketNumber',auth,async(req,res)=>{
try{ 
    var reservedSeat = await Seats.findOne({"ticketNumber":req.params.ticketNumber});
    if(!reservedSeat)
    {
        return res.status(400).send("The seat with this ticket number is not found")
    }
    else
    {
        var userReserving = await User.findOne({"_id":req.user._id,$expr: {$in: [reservedSeat._id, "$reservedSeats"]}});
        if(!userReserving)
        {
            return res.status(400).send("The user logged in did not reserve this seat.") 
        }
        var matchID=reservedSeat.match;
        var match= await Match.findById(matchID);
        if(!match)
        {
            return res.status(400).send("The match with this id was not found.") 
        }

        // Checkig that today is 3 days or more before the start of the event.
        var dateTime=match.dateAndTime;
        var dateToday= new Date();
        var difference = dateTime - dateToday;
        var daysDiff = difference/(1000*3600*24);
        if(daysDiff<3)
        {
            return res.status(400).send("Reservations can not be canceled less than 3 days before the match.")
        }
        // Make the seat vacant.
        const vacantSeat = await Seats.findOneAndUpdate({"ticketNumber":req.params.ticketNumber},{"reserved":false})
        .catch(error => {
            console.log(error);
            return res.status(400).send("Failed to update seat status.");
        })

        // Remove the seat from the user's reserved seats.
        const updateUser = await User.findOneAndUpdate({"_id":req.user._id,},{"$pull":{"reservedSeats":reservedSeat._id}})
        .catch(error => {
            console.log(error);
            return res.status(400).send("Failed to cancel customer's reservation.");
        })

        return res.status(200).send("Successfully canceled the reservation.");
    }
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

// Reserve vacant seat(s) in future matches
//The customer can select vacant seat/s only. The customer is asked to enter a credit card number & its pin number.
//Then the reservation is confirmed and a reservation ticket number (unique) is generated.
router.post('/reserve/:matchId/:seatNumber',auth,async(req,res)=>{
try{
    const match = await Match.findById(req.params.matchId);
    if(!match)
    {
        return res.status(400).send("The match is not found.")
    }
    
    const reserveSeat = await Seats.findOne({"seatNumber":req.params.seatNumber,"match":req.params.matchId})
    if(!reserveSeat)
    {
        return res.status(400).send("The seat is not found.")
    }
    // If seat is already reserved the user can not reserve it.
    if(reserveSeat.reserved==true)
    {
        return res.status(400).send("This seat is already reserved.")
    }

    const updateSeat = await Seats.findOneAndUpdate({"seatNumber":req.params.seatNumber,"match":req.params.matchId},{"reserved":true})
    .catch(error => {
        console.log(error);
        return res.status(400).send("Failed to complete customer's reservation.");
    })

    const updateUser = await User.findOneAndUpdate({"_id":req.user._id,},{"$push":{"reservedSeats":reserveSeat._id}})
    .catch(error => {
        console.log(error);
        return res.status(400).send("Failed to complete customer's reservation.");
    })

    return res.status(200).send({"ticketNumber": updateSeat.ticketNumber});
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});
module.exports=router;    
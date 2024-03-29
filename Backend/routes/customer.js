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

       var matchFound = await Match.findById(req.params.matchId).populate(
        "seats").populate("venue");

       if(!matchFound)
       {
         return res.status(404).send("The match with this id is not found.");        
       }
       else
       {
        var arrfinal=[];
        var obj = { };
        obj=matchFound.seats;
        newObj = obj.map(u =>{ if(u.reserved){return{number: u.seatNumber,isReserved: u.reserved}}
        else{return{number: u.seatNumber}}});
  
        spr=matchFound.venue.seatsPerRow;
        nr=matchFound.venue.numberOfRows;
        ind=0;
        for(p=0;p<nr;p++)
        {
            arrtmp=[];
            for(l=0;l<spr;l++)
            {
                arrtmp.push(newObj[ind]);
                ind++
            }
            arrfinal.push(arrtmp);
        }

        if(arrfinal)
            {return res.status(200).send(arrfinal);}
        else
            {return res.status(400).send("Internal server error.");}
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
    // Checking that not all the body parameters are empty.
    if(req.body.role=="" && req.body.newPassword=="" && req.body.firstName=="" && req.body.lastName=="" && req.body.password=="" && req.body.birthdate=="" && req.body.nationality=="" && req.body.gender=="")
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
    var oldPassword=foundUser.password;
    var newPassword=foundUser.password;
    var newBirthDate=foundUser.birthdate;
    var newNationality=foundUser.nationality;
    var newGender=foundUser.gender;
    var wantsAuth=false;


    // Validating the parameters the user is editing.
    if(req.body.role)
    {
        if(req.body.role=="Manager" && foundUser.role=="Manager")
        {
            return res.status(400).send("This user is already a manager.")
        }
        else if(req.body.role=="Manager")
        {
            wantsAuth=true;
        }
    }
    if(req.body.firstName!="")
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
    if(req.body.lastName!="")
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
    if(req.body.password!="" && req.body.newPassword!="")
    {
        // req.body.newPassword
        const validPass= await bcrypt.compare(req.body.password,oldPassword)
        if(!validPass)
        {
            // Invalid password
            return res.status(400).send('Incorrect password.')
        }
        if(req.body.newPassword.length>7 && req.body.newPassword.length<51)
            {
                const salt=await bcrypt.genSalt(10);
                changePass= await bcrypt.hash(req.body.newPassword,salt);
                newPassword=changePass;
            }
        else
            {
                return res.status(400).send("The new password entered is invalid.")
            }
      
    }
    if(req.body.birthdate!="")
    {
        var validDate=((new Date(req.body.birthdate)!=="Invalid Date") && !isNaN(new Date(req.body.birthdate)));
        if(!validDate)
        {
            return res.status(400).send("The birthdate entered is invalid.")
        }
        newBirthDate=req.body.birthdate;
    }
    if(req.body.nationality!="")
    {
        if(req.body.nationality.length>50 || !allLetters(req.body.nationality))
        {
            return res.status(400).send("The nationality entered is invalid.")
        }   
        newNationality=req.body.nationality;    
    }    
    if(req.body.gender!="")
    {
        if(req.body.gender!="male" && req.body.gender!="female")
        {
            return res.status(400).send("The gender entered is invalid.")
        }
        newGender=req.body.gender;   
    }

    // Updating the user's data.
    var result = await User.findByIdAndUpdate(userID,
        {"firstName":newFirstName,"lastName":newLastName,"password":newPassword,"birthdate":newBirthDate,"nationality":newNationality,"gender":newGender,"role":"Fan","wantsAuthority":wantsAuth}
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
    const userFound = await User.findById(req.user._id).populate({
        path: 'reservedSeats',
        select: { '_id': 0,'seatNumber':1,'ticketNumber':1},  
    });

    if(!userFound)
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

    res.status(200).send(seats);
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

// View all matches' details. 
router.get("/matchDetails",auth,async(req,res)=>{
    try{    
        var matchesFound = await Match.aggregate([
            {
              $lookup:
              {
                 from: 'teams', 
                 localField:'_id', 
                 foreignField:'matches',
                 as:'teams',          
              }
            },
            {
                $set: {
                    teams: [ {$arrayElemAt: ["$teams.name", 0]},{$arrayElemAt: ["$teams.name", 1]} ]
                }
            },
            {
                $lookup:
                {
                   from: 'venues', 
                   localField:'venue', 
                   foreignField:'_id',
                   as:'venue',          
                }
            },
            {
                $set: {
                    venue: "$venue.name"
                }
            },            
            ]);

        if(!matchesFound)
        {
            return res.status(404).send("No matches found.");        
        }
        else
        {

            return res.status(200).send(matchesFound);
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
    
});

module.exports=router;    
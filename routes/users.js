const _ = require('lodash');
const config = require('config')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/usersSchema');
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser');
const Team=require('../models/teamsSchema');
const Stadium=require('../models/venuesSchema');
const Match=require('../models/matchesSchema');
const Joi = require('joi');
const JoiEx = require('joi').extend(require('@joi/date')); 

function valid_Signup (body) {
    const schema = Joi.object({
        userName: Joi.string().min(5).max(50).required(),        
        firstName: Joi.string().min(1).max(50).required(),
        lastName: Joi.string().min(1).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(50).required(),
        nationality: Joi.string().min(0).max(50),
        gender:Joi.string().valid('male', 'female').required(),
        wantsAuthority:Joi.boolean()
    });
    return schema.validate(body);
};

// Signup functionality. 
router.post('/',async(req,res)=> {
try{    
    let newUser = await User.findOne({userName:req.body.userName});
    if(!newUser)
    {
        const {error} = valid_Signup(_.pick(req.body,['userName','firstName','lastName','email','password','nationality','gender','wantsAuthority']))
        if(error) return res.status(400).send(error.details[0].message);

        var validDate=((new Date(req.body.birthdate)!=="Invalid Date") && !isNaN(new Date(req.body.birthdate)));
        if(!validDate)
        {
            return res.status(400).send("The date entered is invalid"); 
        }

        newUser = new User(
            _.pick(req.body,['userName','firstName','lastName','email','password','birthdate','nationality','gender','wantsAuthority'])
        );

        // Hashing the password.
        const salt=await bcrypt.genSalt(10);
        newUser.password= await bcrypt.hash(newUser.password,salt)
        await newUser.save();
        // Token is sent to the client side not saved at the server side(safer).
        return res.header('x-auth-token',newUser.createAuthToken()).send(_.pick(newUser,['userName','email']));
    }
    else
    {
        return res.status(400).send('This username is used.')
    }   
}catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}    
});

// View match details as a guest. 
router.get("/matchDetails/:matchId",async(req,res)=>{
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
            var venueName= await Stadium.findById(matchFound.venue);
            // return the teams that play in this match
            var matchID = mongoose.Types.ObjectId(matchFound._id);
            var teamNames=[];
            const cursor = await Team.find({
                $expr: {
                  $in: [req.params.matchId, "$matches"]
                }
              }).limit(2).select({"name":1,"_id":0})

            teamNames.push(cursor[0].name);
            teamNames.push(cursor[1].name);

            const Obj= ({
            "linesMen":matchFound.linesMen,
            "mainReferee":matchFound.mainReferee,
            "dateAndTime":matchFound.dateAndTime,
            "stadium":venueName.name,   
            "teams":teamNames
            });
            return res.status(200).send(Obj);
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
});

module.exports = router;
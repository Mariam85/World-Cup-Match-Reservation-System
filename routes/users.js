const _ = require('lodash');
const config = require('config')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/usersSchema');
const bcrypt=require('bcrypt')
const bodyParser = require('body-parser');

// Signup functionality. 
router.post('/',async(req,res)=> {

    console.log(req.body);
    let newUser = await User.findOne({userName:req.body.userName});
    if(!newUser)
    {
        // TODO: modify the role setting part.
        newUser = new User(
            _.pick(req.body,['userName','firstName','lastName','email','password','role','birthdate','nationality','gender'])
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
});

module.exports = router;
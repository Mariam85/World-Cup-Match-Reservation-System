const _ = require('lodash');
const config = require('config');
const User = require('../models/usersSchema');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

// Login functionality. 
router.post('/',async(req,res)=> {

    let user = await User.findOne({userName:req.body.userName})
    if(user)
    {
        const validPass= await bcrypt.compare(req.body.password,user.password)
        if(!validPass)
        {
            // Invalid password
            return res.status(400).send('Invalid login. Incorrect email or password.')
        }
        else
        {
            // The email and password are valid.
            return res.status(200).send(user.createAuthToken());
        }
    }
    // Invalid email.
    else
    {
        return res.status(400).send('Invalid login. Incorrect email or password.')
    }

});

module.exports = router;
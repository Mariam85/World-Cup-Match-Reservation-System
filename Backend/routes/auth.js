const _ = require('lodash');
const User = require('../models/usersSchema');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt')

// Login functionality. 
router.post('/',async(req,res)=> {
try{
    if(req.body.userName==null || req.body.password==null)
    {
        return res.status(400).send("One/all of the body parameters are not sent")
    }
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
}catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}  
});

module.exports = router;
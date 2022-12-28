const jwt = require('jsonwebtoken');

// For user authorization.
module.exports = function (req,res,next)
{
    const token=req.header('authToken');
    if(token)
    {
        try{
            const privateKey= config.get('jwtPrivateKey');
            const payloadDecoded = jwt.verify(token,privateKey);
            req.user = payloadDecoded; // To access the id ---> req.user._id
            next();
        }
        catch(ex)
        {
            // Error in token verification.
            return res.status(400).send('The token is invalid.')
        }
    }
    else
    {
        // No token provided in the header.
        return res.status(401).send('Unauthorized user, no token provided.');
    }
}
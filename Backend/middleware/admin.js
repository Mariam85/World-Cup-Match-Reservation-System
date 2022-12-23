// used after auth.js
// 401: invalid token.
// 403: forbidden access.

module.exports=function(req,res,next){
    if(req.user.role =="Admin")
    {
        next();
    }
    else
    {
        return res.status(403).send('Forbidden access');
    }
}
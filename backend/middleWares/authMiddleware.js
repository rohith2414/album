const jwt= require("jsonwebtoken");
const ensureAuthenticated = (req, res, next) => {
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(401).send({message:"Unauthorized jwt token is required"});
    }

    try{
        const decoded=jwt.verify(auth,"GradiousHackathon");
        req.user=decoded;
        next();
    }catch(err){
        return res.status(403).json({message:'Unauthorized, JWT token wrong or expired'});
    }
}

module.exports=ensureAuthenticated;
const userDb=require("../model/userDb");
const jwt=require("jsonwebtoken");

const signUp = async (req,res) => {
    try{
       
        const {name, email, password}=req.body;
        const user = await userDb.isThere(email);
        
        if(user.length !=0){
            return res.status(409).json({message:'User is already exist , You can login', success: false});
        }
        const result= await userDb.saveData([name,email,password]);
        res.status(201).json({message:"signup success", success:true})
    }catch(err){
        res.status(500).json({message:"Internal server error", success:false})
    }
}

const login = async (req,res) => {
    try{
       
        const { email, password}=req.body;
        const user = await userDb.isThere(email);
        const errorMsg='Auth failed email or password is wrong';
        console.log(user);
        if(user.length == 0){
            return res.status(403).json({message:errorMsg, success: false});
        }
        const isPassEqual= (password == user[0].password)
        if(!isPassEqual){
            return res.status(403).json({message:errorMsg, success: false});
        }
        const secretKey="GradiousHackathon";
        const jwtToken=jwt.sign({email:user.email, _id: user.id},secretKey, {expiresIn:'24h'})
        res.status(201).json({message:"login success", success:true, jwtToken, email,name:user.name})
    }catch(err){
        res.status(500).json({message:"Internal server error", success:false})
    }
}

module.exports={
    signUp,
    login
}
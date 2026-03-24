const jwt = require("jsonwebtoken");
const User = require('../models/user')


const userAuth = async (req,res,next)=>{
    try{
    const cookies = req.cookies;

    const {token} = cookies;

    if(!token){
        throw new Error("Token expired!!! please check")
    }

    const isValidToken = await jwt.verify(token,"M@hesh0209")

    const {_id} = isValidToken;

    const user = await User.findById(_id);

    if(!user){
        throw new Error("User is not found!!!")
    }
    req.user = user;
    console.log(res.user)
    next();
    }
    catch(error){
        res.status(400).send("error occured : "+ error.message);
    }
}

module.exports = {
    userAuth,
}
const express = require('express');

const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const User = require("../models/user");

requestRouter.post('/connectionRequest', userAuth, async (req,res)=>{

    try{
        const user = req.user;
        console.log("send connection request!!");
        res.send(user.firstName + " send connection request!!!")
    }catch(error){
        res.status(400).send("error occured : "+ error.message)
    }
})


module.exports = requestRouter;
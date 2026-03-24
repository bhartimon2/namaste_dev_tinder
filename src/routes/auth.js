const express = require('express');

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const {userAuth} = require('../middleware/auth');
const jwt = require('jsonwebtoken');



const authRouter = express.Router();


authRouter.post('/signup',async (req,res)=>{
    // const userObj = {
    //     firstName: "himli",
    //     lastName: "bharti",
    //     emailId: "himli234@gmail.com",
    //     password: "himli123",
    //     age: 5
    // }
        try{
            validateSignUpData(req);

            const {firstName, lastName, emailId, password} = req.body;
            const hasPassword = await bcrypt.hash(password, 10);
            // const users = req.body;

            const userList = new User({
                firstName,
                lastName,
                emailId,
                password: hasPassword,
            });
            await userList.save();
            res.send("users added successfully!!!")
        }catch(error){
            res.status(400).send("Error : "+ error.message);
        }

// creatig a new instance to the user model
    // const user = new User(userObj)
    // try {
    //     await user.save();
    //     res.send("user added successfully!!!")
    // }catch (err){
    //     res.status(400).send("error occured"+ err.message)
    // }
})

authRouter.post('/login',async (req,res)=>{

        try{
            const {emailId, password} = req.body;
            const user = await User.findOne({emailId: emailId})
            if(!user){
                throw new Error("Invalid credential!!!")
            }
            const isPasswordValid = await bcrypt.compare(password, user.password );

            if(isPasswordValid){
                // generate the token with jwt token with sign method
                // const token = await jwt.sign({_id: user._id}, "M@hesh0209",)  we can set the expire time for token by passing the argument as {expiresIn: "1d/10d/2h"} after the sceret key
                const token  = await user.getJWT();
                // Add the token to cookies and send back to user 
                res.cookie("token",token,{
                    expires: new Date(Date.now() + 8 * 3600000),
                  }) // we can set the expire time for cookies as well by passing the argument as {expires: "1d/10d/2h"}
                res.send("Login Successfully!!!")
            }
            else{
                throw new Error("Invalid credential!!!")
            }

        }catch(error){
            res.status(400).send("Error : "+ error.message);
        }
})

authRouter.post("/logout", async (req, res) => {
   try{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
      });
      res.send("Logout Successful!!");
   }catch(error){
    res.status(400).send("Error : "+ error.message);
   }
  });

authRouter.post('/forgot/password', async(req,res)=>{
    try{

        const { emailId } = req.body;

        const user = await User.findOne({ emailId });

        if(!user){
            throw new Error("User is not found, Please sign up!!!");
        }

        const resetToken = jwt.sign({ _id: user._id },"M@hesh02091997", { expiresIn: "10m" });
        console.log(resetToken)

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

        console.log("Reset Link:", resetLink);

        res.send({
            message: "Reset link generated",
            resetLink
        });

        res.send("forgot password!!!")

    }catch(error){
        res.status(400).send("Error : "+ error.message);
    }
})

authRouter.post('/reset/password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        
        // ✅ verify token
        const decoded = jwt.verify(token, "M@hesh02091997");
        
        const user = await User.findById(decoded._id);
        
            if (!user) {
                    throw new Error("User not found");
                }
        
                // ✅ hash new password
                const hashedPassword = await bcrypt.hash(password, 10);
        
                user.password = hashedPassword;
        
                await user.save();
        
                res.send("Password reset successful!!!");
        
            } catch (error) {
                res.status(400).send("Error : " + error.message);
            }
        });

module.exports = authRouter;
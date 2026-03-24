const mongoose = require('mongoose');
const validators =  require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 10,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validators.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        min: 18,
    },
    gender:{
        type: String,
        lowercase: true,
        validate(value){
            if(!["male","female","other","f","m"].includes(value)){
                throw new Error("gender is not matching")
            }
        }
    },
    photoURL:{
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbbvgUGvaUPGWOvVC7nQMoDnRg9jU-Tfs-pw&s"
    },
    about:{
        type: String,
        default: "this is the default user about!!"
    },
    skill:{
        type: [String]
    }
},{
    timestamps: true,
})

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id},"M@hesh0209");
    return token; 
} 

const User = mongoose.model("User", userSchema);

module.exports = User;
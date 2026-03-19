const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
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
})

const User = mongoose.model("User", userSchema);

module.exports = User;
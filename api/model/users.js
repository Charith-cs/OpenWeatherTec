const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:4,
        max:25,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:30,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:16
    },
    city:{
        type:String,
        required:true,
        max:30
    },
    zip:{
        type:String,
        required:true,
        max:10
    },
    country:{
        type:String,
        required:true,
        max:3
    }
},{timeseries:true});

module.exports = mongoose.model("User" , UserSchema);
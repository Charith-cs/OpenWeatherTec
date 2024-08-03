const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
    userId:{
        type:String
    },
    weatherData:{
        type:Array,
        default:[]
    }
}, {timeseries:true});

module.exports = mongoose.model("Weather" , WeatherSchema);
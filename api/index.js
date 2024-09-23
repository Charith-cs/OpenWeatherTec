const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./route/user");
const weatherRoute = require("./route/weather");
const app = express();

//server execution
app.listen(8800 , () => {
    console.log("Backend server is running");
}); 

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
    origin:["https://open-weather-tec-tupw.vercel.app"],
    methods:["POST", "GET"],
    Credentials:true
}));

//routes
app.use('/api/user' , userRoute);
app.use('/api/weather' , weatherRoute);

//db connection
dotenv.config();
mongoose.connect(process.env.MONGO_URL , console.log("Connected to mongoDB"));

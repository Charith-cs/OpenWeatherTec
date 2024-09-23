const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const userRoute = require("./route/user");
const weatherRoute = require("./route/weather");
const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(cors({
    origin: ["https://build-form-final-front.vercel.app"], // Your frontend origin
    methods: ["POST", "GET", "OPTIONS"], // Include OPTIONS for preflight
    credentials: true, // Allows credentials (cookies, authorization headers)
    allowedHeaders: ["Content-Type", "Authorization"] // Explicitly allow these headers
}));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Routes
app.use('/api/user', userRoute);
app.use('/api/weather', weatherRoute);

// Database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("Connected to MongoDB");
});

// Start the server
app.listen(8800, () => {
    console.log("Backend server is running");
});

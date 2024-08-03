const router = require("express").Router();
const Weather = require("../model/weather");
const User = require("../model/users");
const axios = require("axios");
const nodemailer = require("nodemailer"); 
const nodeCron = require("node-cron");
const moment = require("moment");

//get Id based weather data and add weather collection
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const zip = user.zip;
        const country = user.country;
        const apiKey = 'bb57225a3993ef003916eca197e9f1ef';
        //get lat and lon
        const coordinates = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}`);

        const coordinate = coordinates.data;
        const lat = coordinate.lat;
        const lon = coordinate.lon;
        //get date based weather data
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await axios.get(weatherURL);

        const weather = new Weather({
            userId: req.params.id,
            weatherData: response.data
        });

        await weather.save();
        res.status(200).json(response.data );
        console.log(coordinates);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Oops! Something went wrong - ${error.message}` });
    }
});

//send mail to user
nodeCron.schedule('0 */3 * * *', async () => {
    try {
        const users = await User.find({}, '_id email username');

        for (const user of users) {
            const toId = user._id;
            const toEmail = user.email;
            const toName = user.username;

            //get relevent user's weather deatails
            const find = await User.findById(toId);
            const zip = find.zip;
            const country = find.country;
            const apiKey = 'bb57225a3993ef003916eca197e9f1ef';
            const coordinates = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}`);

            //get weather info
            const coordinate = coordinates.data;
            const lat = coordinate.lat;
            const lon = coordinate.lon;
            //get date based weather data
            const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const response = await axios.get(weatherURL);

            //format weather data
            const weatherData = {
                "Status : ": response.data.weather[0].description,
                "Temparature: ": ((response.data.main.temp) - 273.15).toFixed(2) + "°C",
                "Feels like : ": ((response.data.main.feels_like) - 273.15).toFixed(2) + "°C",
                "Minimun temparature : ": ((response.data.main.temp_min) - 273.15).toFixed(2) + "°C",
                "Maximun temparature : ": ((response.data.main.temp_max) - 273.15).toFixed(2) + "°C",
                "Air presure : ": response.data.main.pressure + " hPa"
            };
            const weatherArray = Object.entries(weatherData);
            const formattedWeatherString = weatherArray
                .map(([key, value]) => `${key}${value}`)
                .join('\n');

            //nodemail configuration
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: "openweathertec@gmail.com",
                    pass: "nfxz lntx xvas ifsf "
                },
                tls: {
                    ciphers: 'SSLv3'
                }
            });

            let mailOptions = {
                from: "openweathertec@gmail.com",
                to: toEmail,
                subject: "Your hourly weather report. Dear " + toName,
                text: formattedWeatherString.toString()
            };

            const info = await transporter.sendMail(mailOptions);
            console.log({ message: 'Mail sent to', toEmail, info: info.response });
            //console.log();
        }
    } catch (error) {
        console.log({ error: `Oops! something went wrong ${error.message}` });
    }
});


//historical weather data
{/**router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const zip = user.zip;
        const country = user.country;
        const apiKey = '081de664cb34acf846346e1169adeced';
        //get lat and lon
        const coordinates = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}`);

        const coordinate = coordinates.data;
        const lat = coordinate.lat;
        const lon = coordinate.lon;
        const start = moment(req.body.start).unix();
        const end =  moment(req.body.end).unix();

        //get date based weather data
        const weatherURL = `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${start}&end=${end}&appid=${apiKey}`;
        const response = await axios.get(weatherURL);

         const weather = new Weather({
            userId: req.params.id,
            weatherData : response.data
         });
        await weather.save();
        res.status(200).json(weatherData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Oops! Something went wrong - ${error.message}` });
    }
}); */}

module.exports = router;

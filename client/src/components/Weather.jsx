import React, { useContext, useEffect, useState } from 'react';
import { Air } from '@mui/icons-material';
import { Thermostat } from '@mui/icons-material';
import { WaterDrop } from '@mui/icons-material';
import { Mood } from '@mui/icons-material';
import up from "../assets/up.gif";
import down from "../assets/down.gif";
import wind from "../assets/wind.gif";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import moment from "moment";
 

export default function Weather() {

  const {user} = useContext(AuthContext);
  const [weather , setWeather] = useState(null);
  

  useEffect(()=>{
     const getWeather = async ()=> {
      try{
        const res = await axios.get("/api/weather/"+user._id);
        setWeather(res.data);
      }catch(error){
        console.log(error);
      }
     }
     getWeather();
  },[user]);
console.log(weather);
  return (
    
    <div className=' p-8 w-11/12 h-96 mt-8 ml-14 rounded-lg bg-gradient-to-br from-emerald-700 via-cyan-900 to-slate-900 flex hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:cursor-pointer'>
{weather && (
  
  <>
      <div className=' w-80 h-80 rounded-lg bg-gradient-to-t from-slate-600 via-slate-400 to-white leading-4 hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="icon" className=' w-32 h-32 mt-5 ml-20' />
        <div className=' font-bold text-4xl text-center '>{((weather.main.temp) - 273.15).toFixed(2) + "°C"}</div>
        <div className=' font-bold text-xl text-center'>{weather.weather[0].main}</div>
        <div className=' font-bold text-lg text-center'>*{weather.weather[0].description}</div>
      </div>

      <div className=' w-80 h-80 ml-5 rounded-lg bg-gradient-to-t from-slate-600 via-slate-400 to-white hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
        <div className=' font-bold text-lg mt-14  ml-10 leading-10'>
          <div className='flex'><Mood className=' mt-2 mr-2 text-yellow-600' />Feels like   <span className=' ml-2'> {((weather.main.feels_like) - 273.15).toFixed(2) + "°C"}</span></div>
          <div className='flex'><Thermostat className=' mt-2 mr-2 text-red-600' />Max temp  <span className=' ml-2'>{((weather.main.temp_max) - 273.15).toFixed(2) + "°C"}</span></div>
          <div className='flex'><Thermostat className=' mt-2 mr-2 text-yellow-400' />Min temp   <span className=' ml-2'>{((weather.main.temp_min) - 273.15).toFixed(2) + "°C"}</span></div>
          <div className='flex'><Air className=' mt-2 mr-2 text-blue-300' /> Air pressure   <span className=' ml-2'>{weather.main.pressure} hPa</span></div>
          <div className='flex'><WaterDrop className=' mt-2 mr-2 text-blue-600' />Humidity   <span className=' ml-2'>{weather.main.humidity} %</span></div>
        </div>
      </div>

      <div className=' w-2/4 h-80 ml-5 rounded-lg bg-gradient-to-t from-slate-500 via-white to-white hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px]'>
        <div className='flex justify-between mt-3'>
          <div className='block'>
            <img src={up} alt="up" className=' w-32 h-32' />
            <div className=' text-center font-bold'>
            <p className=' text-xl'>SunRise</p>
            <p>{moment(new Date(weather.sys.sunrise * 1000)).format('h:mm:ss a')}</p>
            </div>
          </div>
          
          <div className=' block'>
            <img src={down} alt="down" className=' w-32 h-32' />
            <div className='text-center font-bold'>
            <p className=' text-xl'>SunSet</p>
            <p>{moment(new Date(weather.sys.sunset * 1000)).format('h:mm:ss a')}</p>
            </div>
          </div>

          <div className=' block'>
            <img src={wind} alt="down" className=' w-32 h-32' />
            <div className='text-center font-bold'>
            <p className=' text-xl'> Wind speed</p>
            <p>{weather.wind.speed} m/s</p>
            <p className=' text-xl'><span className='text-red-500'>*</span >Wind gust</p>
            <p>{weather.wind.gust} m/s</p>
            </div>
          </div>
        </div>

      </div>
      </>)}
    </div> 
  )
}

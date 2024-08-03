import React, { useContext  } from 'react';
import { ExitToApp } from '@mui/icons-material';
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

export default function Topbar() {

    const { user , dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({type:"LOGOUT"});
        navigate("/login");
    };

    return (
        <div className=' sticky top-0 w-full h-12 bg-gradient-to-r from-blue-900 via-teal-800 to-gray-900'>
            <div className=' flex justify-between'>
                <div className=' pt-2 pl-14 font-bold text-xl text-white'>OpenWeatherTec</div>
                <div onClick={handleLogout}>
                <ExitToApp className=' mr-16 mt-3 text-white hover:cursor-pointer hover:text-red-500' />
                </div>

            </div>
        </div>
    )
}

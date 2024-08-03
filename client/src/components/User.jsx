import React, { useContext } from 'react';
import { WhereToVote } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function User() {

    const {user} = useContext(AuthContext);

    return (
        <div className=' p-10 w-11/12 h-28 mt-8 ml-14 rounded-lg bg-gradient-to-br from-emerald-700 via-cyan-900 to-slate-900 flex justify-between hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] hover:cursor-pointer'>
            <div className=' text-2xl font-bold text-white'>Have a Good Day , <span>{user.username}</span> 😍</div>
            <div className=' flex mt-1'>
                <WhereToVote className=' text-white' />
                <Link to="/update"><div className=' text-lg font-bold text-white'>{user.city} , {user.country}</div></Link>
            </div>
        </div>
    )
}

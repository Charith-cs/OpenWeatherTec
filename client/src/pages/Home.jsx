import React from 'react'
import Topbar from '../components/Topbar'
import User from '../components/User'
import Weather from '../components/Weather'

export default function Home() {
  return (
    <div className='w-full h-screen bg-gradient-to-tr from-gray-700 via-gray-900 to-black'>
      <Topbar/>
      <div className=' mt-24'>
        <User/>
        <Weather/>
      </div>
    </div>
  )
} 

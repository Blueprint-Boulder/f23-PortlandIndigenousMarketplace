import React from 'react';
import logo from '../assets/PIM_logo_white.png';
import {useState} from 'react';
export default function Events() {
  const [about, setAbout] = useState(false);
  return (
    <div className="content-center w-auto h-auto">
      <div className="flex flex-col m-1 my-2">
        <img src={logo} alt='Event-logo' className='w-40 h-40 self-start border border-black rounded-xl'/>
        <div className="text-2xl font-bold tracking-wide">Event Title</div>
        <div className='flex flex-col'>
          <label>About
            <select className="self-start m-2 bg-opacity-100" onChange={(e) => setAbout(e.target.value)}>{about}</select>
          </label>
          <div>Location</div>
          <div>Date+Time</div>
          <button
            className="text-gray-800 font-semibold py-2 px-1 border border-gray-400 rounded shadow"
            // onClick={(setRegistered(registered))}
          >Register</button>
        </div>
      </div>
    </div>
  );
}

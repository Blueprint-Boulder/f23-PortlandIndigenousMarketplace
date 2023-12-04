import React from 'react';
import logo from '../assets/PIM_logo_white.png';
import {useState} from 'react';
export default function Events() {
  const [about, setAbout] = useState(false);
  return (
    <div className="content-center w-auto h-auto">
      <div alt="Event-content" className="flex flex-col m-2 my-2">
        <img src={logo} alt='Event-logo' className='w-40 h-40 self-start border border-black rounded-xl'/>
        <div alt="Event-title" className="text-2xl font-bold tracking-wide mt-2">Event Title</div>
        <label>About
          <select className="self-start m-2 bg-opacity-100" onChange={(e) => setAbout(e.target.value)}>{about}</select>
        </label>
        <div>Location</div>
        <div>Date+Time</div>
        <button
          className="text-gray-800 font-semibold py-2 px-1 border border-gray-600 rounded w-24 hover:bg-gray-800 hover:text-gray-200 hover:border-gray-200"
          // onClick={(setRegistered(registered))}
        >Register</button>
        <hr className=" border-gray-500 m-8 w-92"/>
        <div alt='Attending Vendors'>
        </div>
      </div>
    </div>
  );
}

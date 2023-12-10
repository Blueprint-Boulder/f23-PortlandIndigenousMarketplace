import React from 'react';
import logo from '../assets/PIM_logo_white.png';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
export default function Event({EventService}) {
  const [about, setAbout] = useState(false);
  // const [register, setRegistered] = useState(false);

  // wondering if I could use object destructuring here
  // e.g const [location, setLocation] = useState({getEvent})
  // b/c getEvent realistically has a prop location
  const {title, location, date, time, info} = EventService;

  // console.log(getEvent);
  // function to return style
  let custom = 'hidden';
  if (about) {
    custom = 'relative z-10 text-gray-800 m-1 bg-opacity-100 bg-white rounded-lg p-2 w-2/3';
  }

  async function handleRegister() {
    // handle the user registering for the event
    return;
  }
  return (
    <div className="overflow-scroll content-center w-auto h-auto">
      <div alt="Event-content" className="flex flex-col items-center">
        <img src={logo} alt='Event-logo' className='w-45 h-45'/>
        <div alt="Event-title" className="text-2xl font-bold tracking-wide">{title}</div>
        <div alt='Event-about' className='flex flex-row'>
          <div className="mr-2">About</div>
          <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown}/></button>
        </div>
        <div className={custom}>
          {info}
        </div>
        <div>{location}</div>
        <div>{date} at {time}</div>
        <button
          className="mt-2 text-gray-800 font-semibold py-2 px-1 border border-gray-600 rounded w-24 hover:bg-gray-800 hover:text-gray-200 hover:border-gray-200"
          onClick={() => handleRegister()}
        >Register</button>
        <hr className=" border-gray-500 mt-8 mb-4 mx-8 w-92"/>
        <div alt='Attending Vendors'>
        </div>
      </div>
    </div>
  );
}

Event.propTypes = {
  EventService: PropTypes.func.isRequired,
};

import React from 'react';
import logo from '../assets/PIM_logo_white.png';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
export default function Event({registerEvent}) {
  const [about, setAbout] = useState(false);
  // const [register, setRegistered] = useState(false);
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
        <div alt="Event-title" className="text-2xl font-bold tracking-wide">Event Title</div>
        <div alt='Event-about' className='flex flex-row'>
          <div className="mr-2">About</div>
          <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown}/></button>
        </div>
        <div className={custom}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div>Location</div>
        <div>Date+Time</div>
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
  registerEvent: PropTypes.func.isRequired,
};

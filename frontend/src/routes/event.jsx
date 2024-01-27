import React from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../assets/PIM_logo_white.png';
import bLogo from '../assets/PIM_logo_black.png';
import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// eventually have EventService.getEventById(useParams())
// use params will get the params from the url
export default function Event({EventService}) {
  const [about, setAbout] = useState(false);
  const [vendorOpen, setVendorOpen] = useState(false);
  const navigate = useNavigate();

  // const [register, setRegistered] = useState(false);
  // wondering if I could use object destructuring here
  // e.g const [location, setLocation] = useState({getEvent})
  // b/c getEvent realistically has a prop location
  const {title, location, date, time, info} = EventService.getEventById(1);
  // const vendorList = RegisterEventService[id].getVendors();
  const vendorImages = [logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo];

  const toggleVendor = () => {
    setVendorOpen(!vendorOpen);
  };

  async function handleRegister() {
    // handle the user registering for the event
    return;
  }
  return (
    <div id="Event-content" className='overflow-scroll w-full h-full flex flex-col items-center mt-2'>
      <button alt='back-arrow' className='self-start ml-2 fixed ' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAnglesLeft}/></button>
      <img src={bLogo} className='w-2/3 py-0 bg-clip-padding bg-white drop-shadow-xl rounded-xl'/>
      <div className="text-2xl mt-2 font-bold tracking-wide">{title}</div>
      <div className='flex flex-row mt-2'>
        <div className="mr-2">About</div>
        <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown}/></button>
      </div>
      <div className={`${about ? 'relative text-gray-800 m-1 bg-opacity-100 bg-white drop-shadow-xl rounded-md p-2 w-2/3' : 'hidden'}`}>
        {info}
      </div>
      <div className='mr-1 mt-2'>{location}</div>
      <div className='mr-2 mt-2'>{date} | {time}</div>
      <button
        className="mt-3 text-gray-800 font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-white w-24 click:text-white"
        onClick={() => handleRegister()}
      >Register</button>
      <hr className='mt-3 mb-2 border-t-2 border-gray-600 w-3/4'/>
      <div alt='Attending Vendors' className='mt-1 text-xl font-bold italic tracking-wide'>Attending Vendors</div>
      <div alt='vendorImages' className='grid grid-cols-4 gap-3 w-2/3 mt-2 rounded-md '>
        {vendorImages.map((vendorImg) => (
          <img key={vendorImg} src={vendorImg} alt={vendorImg} onClick={toggleVendor} className='w-18 h-14 bg-white rounded-md drop-shadow-xl'/>
        ))}
      </div>
    </div>
  );
}

// <button alt="attendance" onClick={toggleVendor} className="mt-4 text-gray-800 font-semibold py-2 px-1 border border-gray-600 rounded w-24">See attending vendors</button>
// put the images into a container, try to make it sideways scrollable where images are cutoff by border of div
// resize images

Event.propTypes = {
  EventService: PropTypes.func.isRequired,
};

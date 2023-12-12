import React from 'react';
import {useNavigate} from 'react-router-dom';
import logo from '../assets/PIM_logo_white.png';
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

  const toggleVendor = () => {
    setVendorOpen(!vendorOpen);
  };
  // wondering if I could use object destructuring here
  // e.g const [location, setLocation] = useState({getEvent})
  // b/c getEvent realistically has a prop location
  const {title, location, date, time, info} = EventService.getEventById(1);

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
    <div alt="Event-content" onClick={() => setVendorOpen(false)} className={`overflow-scroll w-full h-[80vh] flex flex-col items-center ${vendorOpen ? '' : 'blur-xl z-2'}`}>
      <button alt='back-arrow' className='mx-2 object-left-top fixed' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAnglesLeft}/></button>
      <img src={logo} alt='Event-logo' className='w-2/3 bg-black py-0 bg-clip-padding rounded-xl'/>
      <div alt="Event-title" className="text-2xl mt-4 font-bold tracking-wide">{title}</div>
      <div alt='Event-about' className='flex flex-row mt-4'>
        <div className="mr-2">About</div>
        <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown}/></button>
      </div>
      <div className={custom}>
        {info}
      </div>
      <div className='mt-2'>{location}</div>
      <div className='mt-3'>{date} at {time}</div>
      <button
        className="mt-4 text-gray-800 font-semibold py-2 px-1 border border-gray-600 rounded w-24 click:text-white"
        onClick={() => handleRegister()}
      >Register</button>
      <hr className='mt-3 mb-1 border-t-2 border-gray-600 w-3/4'/>
      <div alt='Attending Vendors'>Attending Vendors</div>
      <button alt="attendance" className="mt-4 text-gray-800 font-semibold py-2 px-1 border border-gray-600 rounded w-24" onClick={(toggleVendor)}>See attending vendors</button>
    </div>
  );
}

Event.propTypes = {
  EventService: PropTypes.func.isRequired,
};

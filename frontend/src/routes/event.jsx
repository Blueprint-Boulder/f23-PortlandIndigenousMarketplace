import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/PIM_logo_white.png';
import bLogo from '../assets/PIM_logo_black.png';
import {Context} from '../services/context.jsx';
import FooterPad from '../components/footerpad.jsx';

export default function Event({eventService}) {
  const [event, setEvent] = useState(null);
  const [about, setAbout] = useState(false);
  const navigate = useNavigate();
  const {eventId} = useParams();
  const {user, setMessage, setBad} = useContext(Context);

  /*
    Make location a link that on click redirects to that same
    location on google maps
   https://www.google.com/maps/dire/?api=1&destination=1600+Amphitheatre
   let address = "1600 Amphitheatre Parkway, Mountain View, CA 94043"
   let encodedAddress = encodeURIComponent(address);
   let googleMapsDirectionLink = https://www.google.com/maps/dir/?api=1&destination=?{encodedAdress};
  */

  useEffect(() => {
    if (!user) {
      setMessage('Please log in');
      setBad(true);
      navigate('/');
    }
    const fetchEvent = async () => {
      console.log('Event id', eventId);
      const eventData = await eventService.getEventById(parseInt(eventId.slice(1)));
      if (!eventData) {
        setMessage('Event not found');
        setBad(true);
        navigate('/events');
      } else {
        setEvent(eventData);
      }
    };

    fetchEvent();
  }, [eventId, eventService, navigate, user]);

  if (!event) {
    return <div>Event Not Found</div>;
  }

  const {name, location, date, startTime, endTime, description} = event;
  const vendorImages = [logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo];

  const toggleVendor = () => {
    setVendorOpen(!vendorOpen); // Ensure `vendorOpen` state is used properly
  };

  async function handleRegister() {
    // Handle the user registering for the event
  }

  const encodedAddress = encodeURIComponent(location);
  // one below pulls up directions
  // const googleMapsDirectionLink =`https://www.google.com/maps/dir/?api=1&destination=?${encodedAddress}`;
  // just append the encode address to the place route
  const googleMapDirectionLink = `https://www.google.com/maps/place/${encodedAddress}`;

  return (
    <div id="Event-content" className="overflow-scroll w-full h-full flex flex-col items-center mt-2">
      {/* <button className="self-start ml-2 fixed" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button> */}
      <img src={bLogo} alt="Event Logo" className="w-2/3 py-0 bg-clip-padding bg-white drop-shadow-xl rounded-xl" />
      <div className="text-2xl mt-2 font-bold tracking-wide">{name}</div>
      <div className='flex flex-row mt-2'>
        <div className="mr-2">About</div>
        <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown} /></button>
      </div>
      <div className={`${about ? 'relative text-gray-800 m-1 bg-opacity-100 bg-white drop-shadow-xl rounded-md p-2 w-2/3' : 'hidden'}`}>
        {description}
      </div>
      <div className='mr-1 mt-2'><a href={googleMapDirectionLink}>{location}</a></div>
      <div className='mr-2 mt-2'>{date} | {startTime} - {endTime}</div>
      <button
        className="mt-3 text-gray-800 font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-white w-24 click:text-white"
        onClick={() => handleRegister()}
      >Register</button>
      <hr className='mt-3 mb-2 border-t-2 border-gray-600 w-3/4' />
      <div alt='Attending Vendors' className='mt-1 text-xl font-bold italic tracking-wide'>Attending Vendors</div>
      <div alt='vendorImages' className='grid grid-cols-4 gap-3 w-2/3 mt-2 rounded-md '>
        {vendorImages.map((vendorImg) => (
          <img key={vendorImg} src={vendorImg} alt={vendorImg} onClick={toggleVendor} className='w-18 h-14 bg-white rounded-md drop-shadow-xl' />
        ))}
      </div>
      <FooterPad/>
    </div>

  );
}

Event.propTypes = {
  eventService: PropTypes.shape({
    getEventById: PropTypes.func.isRequired,
  }).isRequired,
};


// import React, {useEffect} from 'react';
// import {useNavigate, useParams} from 'react-router-dom';
// import logo from '../assets/PIM_logo_white.png';
// import bLogo from '../assets/PIM_logo_black.png';
// import {useState} from 'react';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
// import {faAnglesLeft} from '@fortawesome/free-solid-svg-icons';
// import PropTypes from 'prop-types';

// // eventually have EventService.getEventById(useParams())
// // use params will get the params from the url
// export default function Event({eventsService}) {
//   const [about, setAbout] = useState(false);
//   const [vendorOpen, setVendorOpen] = useState(false);
//   const navigate = useNavigate();
//   const {eventId} = useParams();

//   // const [register, setRegistered] = useState(false);
//   // wondering if I could use object destructuring here
//   // e.g const [location, setLocation] = useState({getEvent})
//   // b/c getEvent realistically has a prop location
//   const e = eventsService.getEventById(parseInt(eventId));
//   console.log(eventsService.getEventById(0));
//   if (e === undefined) {
//     useEffect(()=>{
//       navigate('/events');
//     });
//   }
//   const {name, location, date, startTime, endTime, description, vendorCapacity} = e !== undefined ? e : {name: 'Loading...', location: 'Loading...', date: 'Loading...', startTime: 'Loading...', endTime: 'Loading...', description: 'Loading...', vendorCapacity: 'Loading...'};
//   // const vendorList = RegisterEventService[id].getVendors();
//   const vendorImages = [logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo, logo, bLogo];

//   const toggleVendor = () => {
//     setVendorOpen(!vendorOpen);
//   };

//   async function handleRegister() {
//     // handle the user registering for the event
//     return;
//   }
//   return (
//     <div id="Event-content" className='overflow-scroll w-full h-full flex flex-col items-center mt-2'>
//       <button alt='back-arrow' className='self-start ml-2 fixed ' onClick={() => navigate(-1)}><FontAwesomeIcon icon={faAnglesLeft}/></button>
//       <img src={bLogo} className='w-2/3 py-0 bg-clip-padding bg-white drop-shadow-xl rounded-xl'/>
// <div className="text-2xl mt-2 font-bold tracking-wide">{name}</div>
// <div className='flex flex-row mt-2'>
//   <div className="mr-2">About</div>
//   <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown}/></button>
// </div>
// <div className={`${about ? 'relative text-gray-800 m-1 bg-opacity-100 bg-white drop-shadow-xl rounded-md p-2 w-2/3' : 'hidden'}`}>
//   {description}
// </div>
// <div className='mr-1 mt-2'>{location}</div>
// <div className='mr-2 mt-2'>{date} | {startTime}</div>
// <button
//   className="mt-3 text-gray-800 font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-white w-24 click:text-white"
//   onClick={() => handleRegister()}
// >Register</button>
// <hr className='mt-3 mb-2 border-t-2 border-gray-600 w-3/4'/>
// <div alt='Attending Vendors' className='mt-1 text-xl font-bold italic tracking-wide'>Attending Vendors</div>
// <div alt='vendorImages' className='grid grid-cols-4 gap-3 w-2/3 mt-2 rounded-md '>
//   {vendorImages.map((vendorImg) => (
//     <img key={vendorImg} src={vendorImg} alt={vendorImg} onClick={toggleVendor} className='w-18 h-14 bg-white rounded-md drop-shadow-xl'/>
//   ))}
// </div>
//     </div>
//   );
// }

// // <button alt="attendance" onClick={toggleVendor} className="mt-4 text-gray-800 font-semibold py-2 px-1 border border-gray-600 rounded w-24">See attending vendors</button>
// // put the images into a container, try to make it sideways scrollable where images are cutoff by border of div
// // resize images

// Events.propTypes = {
//   eventsService: PropTypes.shape({
//     getEventById: PropTypes.func.isRequired,
//   }).isRequired,
// };



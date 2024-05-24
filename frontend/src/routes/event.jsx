import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/PIM_logo_white.png';
import bLogo from '../assets/PIM_logo_black.png';
import {Context} from '../services/context.jsx';
import FooterPad from '../components/footerpad.jsx';
import EventVendorsDisplay from '../components/EventVendorsDisplay.jsx';
import User from '../objects/User.js';

export default function Event({eventService, vendorService}) {
  const [event, setEvent] = useState(null);
  const [about, setAbout] = useState(false);
  const navigate = useNavigate();
  const {eventId} = useParams();
  const {user, setMessage, setBad} = useContext(Context);

  const [requests, setRequests] = useState([]);
  const [vendors, setVendors] = useState([]);

  // When true, shows the approved vendors to attend an event. On false, shows the requested vendors.
  const [showApproved, setShowApproved] = useState(true);

  // eslint-disable-next-line
  const [loggedUser, setLoggedUser] = useState(User.getLoggedInUser());

  /*
    Make location a link that on click redirects to that same
    location on google maps
   https://www.google.com/maps/dire/?api=1&destination=1600+Amphitheatre
   let address = "1600 Amphitheatre Parkway, Mountain View, CA 94043"
   let encodedAddress = encodeURIComponent(address);
   let googleMapsDirectionLink = https://www.google.com/maps/dir/?api=1&destination=?{encodedAdress};
  */


  useEffect(() => {
    (async () => {
      // Load the event data from database
      // console.log('Event id', eventId);
      const eventData = await eventService.getEventById(parseInt(eventId));
      if (!eventData) {
        setMessage('Event not found');
        setBad(true);
        navigate('/events');
      } else {
        setEvent(eventData);
      }

      // console.log('Event', eventData);

      // Load all requests
      if (loggedUser && loggedUser.isadmin) {
        // console.log('Checking requests as admin.');

        let reqs;
        try {
          reqs = await eventService.getEventRequests(parseInt(eventId));
        } catch (e) {
          console.log('No requests found.');
          return;
        }

        if (!reqs) {
          setMessage('Failed to fetch requests for event.');
          setBad(true);
        } else {
          setRequests(reqs);
          // console.log('Requests', requests);

          // Load vendors
          const vends = [];
          reqs.forEach(async (req) => {
            const vend = await vendorService.getVendorById(req.vendorId);
            if (!vend) {
              console.log('Error: You should not be seeing this! There was an EventRequest for a vendor that couldn\'t be found.');
            } else {
              vends.push(vend);
            }
          });

          setVendors(vends);
        }
      } else { // Load only approved vendors
        console.log('Checking requests as vendor');
        setRequests([]);

        let reqs;
        try {
          reqs = await eventService.getAttendingVendors(parseInt(eventId));
        } catch (e) {
          console.log('No eventRequests found.');
          return;
        }

        // console.log('AttendingVendors', reqs);

        if (!reqs) {
          setMessage('Failed to fetch requests for event.');
          setBad(true);
        } else {
          setVendors(reqs);
        }
      }
    })();
  }, [loggedUser]);

  if (!event) {
    return <div>Event Not Found</div>;
  }

  const {name, location, date, starttime, endtime, description} = event;

  async function handleRegister() {
    const res = await eventService.createEventRequest(event.eventId, user.id);
    console.log('Res status', res);
    if (!res) {
      setMessage('Failed to register for event');
      setBad(true);
    } else {
      setMessage('Registered for event');
    }
  }

  const encodedAddress = encodeURIComponent(location);
  // one below pulls up directions
  // const googleMapsDirectionLink =`https://www.google.com/maps/dir/?api=1&destination=?${encodedAddress}`;
  // just append the encode address to the place route
  const googleMapDirectionLink = `https://www.google.com/maps/place/${encodedAddress}`;

  return (
    <div id="Event-content" className="overflow-scroll w-full h-full flex flex-col items-center mt-2">
      <img src={bLogo} alt="Event Logo" className="w-2/3 lg:w-1/3 md:w-1/3 py-0 bg-clip-padding bg-white drop-shadow-xl rounded-xl" />
      <div className="text-2xl mt-2 font-bold tracking-wide">{name}</div>
      <div className='flex flex-row mt-2'>
        <div className="mr-2">About</div>
        <button onClick={() => setAbout(!about)}><FontAwesomeIcon icon={faCaretDown} /></button>
      </div>
      <div className={`${about ? 'relative text-gray-800 m-1 bg-opacity-100 bg-white drop-shadow-xl rounded-md p-2 w-2/3' : 'hidden'}`}>
        {description}
      </div>
      <div className='mr-1 mt-2'><a href={googleMapDirectionLink}>{location}</a></div>
      <div className='mr-2 mt-2'>{date} | {starttime} - {endtime}</div>
      {(user && !user.isadmin) ?
        <button
          className="mt-3 text-gray-800 font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-white w-24 click:text-white"
          onClick={() => handleRegister()}
        >Register</button> : <></>
      }
      <div className='flex flex-row items-center justify-between w-full px-4'>
        <div className='w-28'>&nbsp;</div>
        <p className='text-2xl font-bold'>{showApproved ? 'Attending Vendors' : 'Pending Requests'} ({showApproved ? vendors.length : requests.filter((req) => !req.approved).length})</p>
        {
          user && user.isadmin && <button className='text-gray-800 drop-shadow-xl rounded-md bg-white click:text-white px-5 py-2'
            onClick={() => {
              setShowApproved(!showApproved);
            }}>Show {showApproved ? 'Pending' : 'Attending'}</button>
        }
      </div>
      <EventVendorsDisplay showApproved={showApproved} vendors={vendors} requests={requests} eventService={eventService}></EventVendorsDisplay>
      <FooterPad />
    </div>

  );
}

Event.propTypes = {
  eventService: PropTypes.shape({
    getEventById: PropTypes.func.isRequired,
    getAttendingVendors: PropTypes.func.isRequired,
    getEventRequests: PropTypes.func.isRequired,
    createEventRequest: PropTypes.func.isRequired,
    updateEventRequest: PropTypes.func.isRequired,
  }).isRequired,
  vendorService: PropTypes.shape({
    getVendorById: PropTypes.func.isRequired,
  }).isRequired,
};



import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import bLogo from '../assets/PIM_logo_black.png';
import {Context} from '../services/context.jsx';
import FooterPad from '../components/footerpad.jsx';
import EventVendorsDisplay from '../components/EventVendorsDisplay.jsx';
import User from '../objects/User.js';
import mapsicon from '../assets/mapsicon.png';

import EditEventModal from '../components/EditEventModal.jsx';

const adminButtonClasses = `text-white font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-black`;

export default function Event({eventService, vendorService}) {
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();
  const {eventId} = useParams();
  const {user, setMessage, setBad} = useContext(Context);

  const [requests, setRequests] = useState([]);
  const [vendors, setVendors] = useState([]);

  // When true, shows the approved vendors to attend an event. On false, shows the requested vendors.
  const [showApproved, setShowApproved] = useState(true);

  // eslint-disable-next-line
  const [loggedUser, setLoggedUser] = useState(User.getLoggedInUser());

  // When true, the edit event modal will be shown
  const [showEditModal, setShowEditModal] = useState(false);

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

      console.log('Event', eventData);

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

  const {name, location, starttime, endtime, description} = event;

  // Parses the start / end time to a human readable format
  const timeFormat = new Intl.DateTimeFormat('en', {
    timeStyle: 'short',
    dateStyle: 'short',
  });

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

  return (<>
    {showEditModal && <EditEventModal event={event} eventService={eventService} setShowEditModal={setShowEditModal} />}
    <div id="Event-content" className="overflow-y-scroll w-full h-full flex flex-col gap-6 items-center py-2">
      <div className='flex flex-row gap-4 px-10 py-6 bg-white w-10/12 rounded-md drop-shadow-md items-center'>
        <img src={bLogo} alt="Event Logo" className="w-1/3 basis-1/3 bg-clip-padding bg-white drop-shadow-xl rounded-xl" />
        <div className='flex flex-col gap-1 basis-2/3 w-2/3'>
          <div className={`flex flex-row ${loggedUser && loggedUser.isadmin ? 'justify-between' : 'justify-left'}`}>
            <div className="text-4xl mt-2 font-bold tracking-wide">{name}</div>
            {
              loggedUser && loggedUser.isadmin && <button className={`${adminButtonClasses} p-1 h-min -translate-y-3 translate-x-4`} onClick={()=>{
                setShowEditModal(true);
              }}>
              Edit Event
              </button>
            }
          </div>
          <a href={googleMapDirectionLink} className='flex flex-row gap-1'><img src={mapsicon} className='w-4 h-auto'></img>{location}</a>
          <div className='mr-2 mt-2'>{`${timeFormat.format(starttime)} - ${timeFormat.format(endtime)}`}</div>
        </div>
      </div>
      {
        description && <div className='flex flex-row justify-left gap-3 bg-white w-10/12 rounded-md drop-shadow-lg p-10'>
          <p className='text-slate-500 font-semibold'>Description</p>
          <p>{description}</p>
        </div>
      }
      {(user && !user.isadmin) ?
        <button
          className={`${adminButtonClasses} py-2 px-1 w-24`}
          onClick={() => handleRegister()}
        >Register</button> : <></>
      }
      <div className='flex flex-col gap-3 items-center'>
        <p className='text-2xl font-bold'>{showApproved ? 'Attending Vendors' : 'Pending Requests'} ({showApproved ? vendors.length : requests.filter((req) => !req.approved).length})</p>
        {
          user && user.isadmin && <button className={`${adminButtonClasses} px-5 py-2 w-4/6`}
            onClick={() => {
              setShowApproved(!showApproved);
            }}>Show {showApproved ? 'Pending' : 'Attending'}</button>
        }
      </div>
      <EventVendorsDisplay showApproved={showApproved} vendors={vendors} requests={requests} eventService={eventService}></EventVendorsDisplay>
      <FooterPad />
    </div>
  </>
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



import React, {useEffect, useState, useContext} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
// import logo from '../assets/PIM_logo_white.png';
import bLogo from '../assets/PIM_logo_black.png';
import {Context} from '../services/context.jsx';
import FooterPad from '../components/footerpad.jsx';

export default function Event({eventService, vendorService}) {
  const [event, setEvent] = useState(null);
  const [about, setAbout] = useState(false);
  const navigate = useNavigate();
  const {eventId} = useParams();
  const {user, setMessage, setBad} = useContext(Context);
  const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState([]);
  const [pending, setPending] = useState([]);
  const [update, setUpdate] = useState(false);


  /*
    Make location a link that on click redirects to that same
    location on google maps
   https://www.google.com/maps/dire/?api=1&destination=1600+Amphitheatre
   let address = "1600 Amphitheatre Parkway, Mountain View, CA 94043"
   let encodedAddress = encodeURIComponent(address);
   let googleMapsDirectionLink = https://www.google.com/maps/dir/?api=1&destination=?{encodedAdress};
  */

  useEffect(() => {
    // if (!user) {
    //   setMessage('Please log in');
    //   setBad(true);
    //   navigate('/');
    // }
    const fetchData = async () => {
      console.log('Event id', eventId);
      const eventData = await eventService.getEventById(parseInt(eventId));
      if (!eventData) {
        setMessage('Event not found');
        setBad(true);
        navigate('/events');
      } else {
        setEvent(eventData);
      }

      try {
        if (user.isadmin) {
          const requests = await eventService.getEventRequests(parseInt(eventId));
          console.log('Requests', requests);
          if (!requests) {
            setMessage('Failed to fetch requests');
            setBad(true);
          } else {
            setRequests(requests);
            console.log('Requests', requests);
            const newapproved = [];
            const newpending = [];
            for (let i = 0; i < requests.length; i++) {
              if (requests[i].approved) {
                newapproved.push(requests[i]);
              } else {
                newpending.push(requests[i]);
              }
            }
            for (let i = 0; i < newapproved.length; i++) {
              const vendor = await vendorService.getVendorById(newapproved[i].vendorId);
              newapproved[i] = vendor;
            }
            for (let i = 0; i < newpending.length; i++) {
              const vendor = await vendorService.getVendorById(newpending[i].vendorId);
              newpending[i] = vendor;
            }
            setApproved(newapproved);
            setPending(newpending);
          }
        }
      } catch (error) {
        console.log('Error fetching requests', error);
      }
    };
    fetchData();
  }, [update]);

  if (!event) {
    return <div>Event Not Found</div>;
  }

  const {name, location, date, starttime, endtime, description} = event;
  // const vendorImages = attendingVendors.map((vendor) => {
  //   'image' in vendor && vendor.image;
  // });

  // const toggleVendor = () => {
  //   setVendorOpen(!vendorOpen); // Ensure `vendorOpen` state is used properly
  // };

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

  async function updateRequest(vendorId) {
    let reqId = requests.filter((req) => req.vendorId === vendorId);
    const approved = !reqId[0].approved;
    reqId = reqId[0].requestId;
    console.log('Req id', reqId);
    const res = await eventService.updateEventRequest(reqId, {approved: approved});
    console.log('Res status', res);
    if (!res) {
      setMessage('Failed to update request');
      setBad(true);
    } else {
      setMessage('Request Updated');
    }
    setUpdate(!update);
  }

  // function mapRequests() {
  //   if (requests.length === 0) {
  //     return;
  //   }
  //   return requests.map((request) => {
  //     return (
  //       <div key={request.request_id} className="flex flex-row justify-between">
  //         <div>{request.vendorId}</div>
  //         <div>{request.approved ? 'Approved' : 'Pending'}</div>
  //       </div>
  //     );
  //   });


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
      // ('id' in user )?
      // <></> :
      // <div className='font-bold text-lg my-4'>Please login to request attendance</div>
      }
      <hr className='mt-3 mb-2 border-t-2 border-gray-600 w-3/4' />
      {user && user.isadmin &&
      <>
        <div className='grid grid-cols-2 divide-x '>

          <div alt='Attending Vendors' className='mt-1 text-base p-2 font-medium italic tracking-wide border-b'>Approved Requests</div>
          <div className='mt-1 text-base font-medium italic tracking-wide p-2 border-b'>Pending Requests</div>
          <div alt='vendorImages' className='border-none'>
            {approved.map((vendor) => (
              // <div key={vendor.id} className='flex flex-row justify-between w-full mx-4 items-center'>
              //   <img key={vendor.image} src={vendor.image} alt='vendors image' onClick={toggleVendor} className='w-12 h-12 bg-white rounded-md drop-shadow-xl' />
              //   <div className='text-xl' onClick={() => updateRequest(vendor.id)}><FontAwesomeIcon icon={faXmark} /></div>
              // </div>
              <div key={vendor.request_id} className='flex flex-row justify-between p-2'>
                <div>{vendor.name}</div>
                <div className='text-xl' onClick={() => updateRequest(vendor.id)}><FontAwesomeIcon icon={faXmark} /></div>
              </div>
            ))}
          </div>
          <div className='mr-4'>
            {pending.map((vendor) => {
              return (
                <div key={vendor.request_id} className='flex flex-row justify-between p-2'>
                  <div>{vendor.name}</div>
                  <div className='text-xl' onClick={() => updateRequest(vendor.id)}><FontAwesomeIcon icon={faCheck} /></div>
                </div>
              );
            })}
          </div>
        </div>
      </>
      }
      <FooterPad/>
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



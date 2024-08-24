import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Context} from '../services/context';
import {Link} from 'react-router-dom';
import FooterPad from '../components/footerpad';
import EditEventModal from '../components/EditEventModal.jsx';
import Event from '../objects/Event';

export default function Events({eventService}) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const {user} = useContext(Context);

  // Add / Edit event modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [currEvent, setCurrEvent] = useState(null);
  const [isNewEvent, setIsNewEvent] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await eventService.getAllEvents();
        if (fetchedEvents.length === 0) {
          setError('There are currently no events.');
        } else {
          setEvents(fetchedEvents);
          setError(''); // Reset error state if events are fetched successfully
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.'); // Handle any other errors during fetch
      }
    };

    fetchEvents();
  }, [eventService, currEvent]);

  const eventDisplay = (event) => {
    const start = new Date(`${event.startDate} ${event.starttime}`);
    const end = new Date(`${event.endDate} ${event.endtime}`);

    return (
      <div className="flex flex-col gap-2 bg-greywhite text-grey-5 shadow-lg rounded-lg p-4 max-w-sm mx-4">
        <div className="text-lg font-bold text-gray-900">{event.name}</div>
        <div className='font-semibold'>{event.description}</div>
        <div className='flex flex-row gap-4 align-center'>
          <p>{event.date}</p>
          <p>{start.toLocaleTimeString('en-US', {timeStyle: 'short'})} - {end.toLocaleTimeString('en-US', {timeStyle: 'short'})}</p>
        </div>
        <div className="mt-1 text-sm relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z" />
          </svg>
          {event.location}
        </div>
        <div className="flex flex-row justify-between align-center">
          <Link to={`/events/${event.eventId}`} className="text-blue p-2 rounded-md inline-block">
            View Event Details
          </Link>
          {
            user && user.isadmin && <button onClick={() => {
              setIsNewEvent(false); setCurrEvent(event); setShowEditModal(true);
            }} className='text-blue text-md p-2'>Edit</button>
          }
        </div>
      </div>
    );
  };


  if (error) {
    return (
      <div className='w-full relative mx-auto flex flex-col justify-center pb-16'>
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>No Events Found</h1>
        {!showEditModal && user && user.isadmin && <button className='bg-white hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
          onClick={() => {
            setIsNewEvent(true); setCurrEvent(new Event(undefined, "", "", new Date(), new Date(), "", 0)); setShowEditModal(true);
          }}>Add Event</button>}
      </div>
    );
  }

  return (
    <>
      {showEditModal && <EditEventModal event={currEvent} eventService={eventService} setShowEditModal={setShowEditModal} isNewEvent={isNewEvent}/>}
      <div className={`w-full mx-auto flex flex-col justify-center pb-16`}>
        
        <div className={`flex flex-row ${user && user.isadmin ? 'justify-around' : 'justify-center'}`}>
          {!showEditModal && user && user.isadmin && <button className='bg-greywhite hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
            onClick={() => {
              setIsNewEvent(true); setCurrEvent(new Event(undefined, "", "", new Date(), new Date(), "", 0)); setShowEditModal(true); 
            }}>Add Event</button>}

          <h1 className='color-white text-2xl text-center my-3 font-semibold'>Events</h1>
        </div>
        <div className='flex flex-col space-y-4 mx-auto w-max'>
          {
            events && (Array.isArray(events) ? events.map((event, i) => (
              <div className='list-style:none' key={event.eventId}>{eventDisplay(event)}</div>
            )) : eventDisplay(events))
          }
        </div>
        <FooterPad/>
      </div>
    </>
  );
}

Events.propTypes = {
  eventService: PropTypes.shape({
    getAllEvents: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
  }).isRequired,
};

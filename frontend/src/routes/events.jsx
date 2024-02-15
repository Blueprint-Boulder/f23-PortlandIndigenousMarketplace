import React, {useContext} from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Context} from '../services/context';

export default function Events({eventService}) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const {user} = useContext(Context);

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
  }, [eventService]);

  const handleAddEvent = () => {
    console.log('add event called, but I am not implemented :(((');
    // eventsService.createEvent(); this needs implementation
  };

  const handleEditEvent = () => {
    console.log('edit event called, but I am not implemented :(((');
  };

  const eventDisplay = (event) => (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto bm-4">
      <div className="mt-2">
        <div className="text-lg font-semibold text-gray-900">{event.name}</div>
        <div className="text-grey-5">{event.description}</div>
        <div className="mt-3 text-grey-5">{event.date} • {event.startTime} - {event.endTime}</div>
        <div className="mt-1 text-sm text-grey-5 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z" />
          </svg>
          {event.location}
          {user && user.isadmin && <button onClick={() => handleEditEvent()} className='hover:bg-blue absolute right-0 text-sm text-grey-5 px-1 rounded-md bg-white border-2'>Edit</button>}
        </div>

      </div>
    </div>
  );

  if (error) {
    return (
      <div className='w-full mx-auto flex flex-col justify-center pb-16'>
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>No Events Found</h1>
      </div>
    );
  }

  return (
    // display in a single column
    <div className='w-full mx-auto flex flex-col justify-center pb-16'>
      <div className='static'>
        {user && user.isadmin && <button className='bg-white hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
          onClick={() => handleAddEvent()}>Add Event</button>}
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>Events</h1>
      </div>
      <div className='flex flex-col space-y-4'>
        {
          events && (Array.isArray(events) ? events.map((event, i) => (
            <li className='[list-style:none]' key={i}>{eventDisplay(event)}</li>
          )) : eventDisplay(events))
        }
      </div>
    </div>
  );
}

Events.propTypes = {
  eventService: PropTypes.shape({
    getAllEvents: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
  }).isRequired,
};

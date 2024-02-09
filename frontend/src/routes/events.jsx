import React, {useContext} from 'react';
import {Context} from '../services/context.jsx';
import {useState} from 'react';
import PropTypes from 'prop-types';


export default function Events({EventService}) {
  const [events] = useState(EventService.getEvents());
  const {user} = useContext(Context);

  console.log('events', user);
  const handleAddEvent = () => {
    console.log('add event called');
  };

  const handleEditEvent = () => {
    console.log('edit event called');
  };

  const eventDisplay = (event) => (
    // event name, date, starttime, endtime, description, location in a single row
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto bm-4 static">
      <div className="mt-2">
        <div className="text-lg font-semibold text-gray-900">{event.name}</div>
        <div className="text-grey-5">{event.description}</div>
        <div className="mt-3 text-grey-5">{event.date} • {event.startTime} - {event.endTime}</div>
        <div className="mt-1 text-sm text-grey-5 relative">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z" />
          </svg>
          {event.location}
          {user && user.isadmin && <button onClick = {() => handleEditEvent()} className='hover:bg-blue absolute right-0 text-sm text-grey-5 px-1 rounded-md bg-white border-2'>Edit</button>}
        </div>

      </div>
    </div>
  );

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
  EventService: PropTypes.func.isRequired,
};

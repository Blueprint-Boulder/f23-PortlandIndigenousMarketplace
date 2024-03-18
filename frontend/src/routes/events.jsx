import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Context} from '../services/context';
import {Link} from 'react-router-dom';
import FooterPad from '../components/footerpad';


import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function EventModal({editEvent, handleSubmit}) {
  const [eventInfo, setEventInfo] = useState({name: '', description: '', location: '', starttime: new Date(), endtime: new Date(), vendorCapacity: 0});
  return (
    <div>
      <form action="" className='flex flex-col' onSubmit = {() => handleSubmit(eventInfo)}>
        <label htmlFor="eventName" className='py-4'>Event Name:</label>
        <input required type="text" id='eventName' name='eventName' onChange = {(e) => setEventInfo({...eventInfo, name: e.target.value})}/>
        <label htmlFor="description" className='py-4'>Description:</label>
        <input required type="text" id='description' name='description' onChange = {(e) => setEventInfo({...eventInfo, description: e.target.value})} />
        <label htmlFor="location" className='py-4' >Location:</label>
        <input required type="text" id='location' name='location' onChange = {(e) => setEventInfo({...eventInfo, location: e.target.value})}/>
        <label htmlFor="start-time" className='py-4' >Start Time:</label>
        <DatePicker
          id='start-time'
          name='start-time'
          selected={eventInfo.starttime}
          onChange={(dateTime) => setEventInfo({...eventInfo, starttime: dateTime})}
          showTimeSelect
          timeIntervals={15}
          required
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <label htmlFor="end-time" className='py-4' >End Time:</label>
        <DatePicker
          id='end-time'
          name='end-time'
          selected={eventInfo.endtime}
          onChange={(dateTime) => setEventInfo({...eventInfo, endtime: dateTime})}
          showTimeSelect
          timeIntervals={15}
          required
          timeCaption="Time"
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <label htmlFor="vendor-capacity" className='py-4' >Vendor Capacity:</label>
        <input type="text" id='vendor-capacity' name='location' onChange = {(e) => setEventInfo({...eventInfo, vendorCapacity: e.target.value})}/>
        <button type='submit' className='bg-blue text-white p-5 mt-8 mb-4'>{editEvent ? 'Save Changes' : 'Add Event'}</button>
        <button type='button' className='bg-red text-white p-5' onClick={() => setModal(false)}>Cancel</button>
      </form>
    </div>
  );
}

export default function Events({eventService}) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const {user} = useContext(Context);
  const [modal, setModal] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [currId, setCurrId] = useState(null);

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

  async function handleSubmit(event) {
    // if we are editing an event we need to update the event
    if (editEvent) {
      setEditEvent(true);
      setModal(false);
      const res = await eventService.updateEvent(currId, event);// this is wrong
      console.log('Res status', res.status);
      if (res !== undefined) {
        console.log('Event updated successfully');
        const updatedEvents = await eventService.getAllEvents();
        setEvents(updatedEvents);
      } else {
        console.error('Failed to update event');
      }
    } else { // else we are creating a new event
      setEditEvent(false);
      setModal(false);
      const res = await eventService.createEvent(event);
      if (res !== undefined) {
        console.log('Event added successfully');
        const updatedEvents = await eventService.getAllEvents();
        setEvents(updatedEvents);
      } else {
        console.error('Failed to add event');
      }
    }
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
          {user && user.isadmin && <button onClick={() => {
            setEditEvent(true); setModal(true); setCurrId(event.eventId);
          }} className='hover:bg-blue absolute right-0 text-sm text-grey-5 px-1 rounded-md bg-white border-2'>Edit</button>}
        </div>
        <Link to={`/events/:${event.eventId}`} className="mt-2 bg-blue-500 text-black p-2 rounded-md inline-block">
          View Event Details
        </Link>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className='w-full mx-auto flex flex-col justify-center pb-16'>
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>No Events Found</h1>
        {!modal && user && user.isadmin && <button className='bg-white hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
          onClick={() => {
            setEditEvent(false); setModal(true);
          }}>Add Event</button>}
        {modal && (
          <EventModal editEvent={editEvent} handleSubmit={handleSubmit}/>
        )}
      </div>
    );
  }

  return (
    <div className='w-full mx-auto flex flex-col justify-center pb-16'>
      <div className='static'>
        {!modal && user && user.isadmin && <button className='bg-white hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
          onClick={() => {
            setEditEvent(false); setModal(true);
          }}>Add Event</button>}
        {modal && (
          <EventModal editEvent={editEvent} handleSubmit={handleSubmit}/>
        )}
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>Events</h1>
      </div>
      <div className='flex flex-col space-y-4'>
        {
          events && (Array.isArray(events) ? events.map((event, i) => (
            <div className='list-style:none' key={event.eventId}>{eventDisplay(event)}</div>
          )) : eventDisplay(events))
        }
      </div>
      <FooterPad/>
    </div>
  );
}

Events.propTypes = {
  eventService: PropTypes.shape({
    getAllEvents: PropTypes.func.isRequired,
    createEvent: PropTypes.func.isRequired,
    updateEvent: PropTypes.func.isRequired,
  }).isRequired,
};

EventModal.propTypes = {
  editEvent: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

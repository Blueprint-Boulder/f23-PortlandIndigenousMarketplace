import React, {useContext, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Context} from '../services/context';
import {Link} from 'react-router-dom';
import FooterPad from '../components/footerpad';


import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

function EventModal({editEvent, handleSubmit, closeModal, currEvent}) {
  const [eventInfo, setEventInfo] = useState({name: '', description: '', location: '', starttime: new Date(), endtime: new Date(), vendorCapacity: 0});
  useEffect(() => {
    if (editEvent) {
      currEvent.starttime = new Date(currEvent.startDate);
      currEvent.endtime = new Date(currEvent.endDate);
      console.log('Curr event', currEvent);
      setEventInfo(currEvent);
    }
  }, [editEvent]);


  return (
    <form action="" className='grid z-50 gap-2 p-4 lg:grid-cols-12 grid-cols-3 left-0 right-0 top-0 bottom-0 mt-auto mb-auto h-4/6 lg:ml-auto lg:mr-auto rounded-sm lg:w-8/12 w-full fixed bg-grey-1'
      onSubmit={() => handleSubmit(eventInfo)}>
      <div className='lg:col-span-2 col-span-1 my-auto'>Event Name:</div>
      <input className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1' required type="text" id='eventName' name='eventName' value={eventInfo.name} onChange={(e) => setEventInfo({...eventInfo, name: e.target.value})} />
      <div className='lg:col-span-2 col-span-1 row-span-2'>Description:</div>
      <textarea className='lg:col-span-10 col-span-2 row-span-2 rounded-md shadow-md p-1' required type="text" id='description' name='description' value={eventInfo.description} onChange={(e) => setEventInfo({...eventInfo, description: e.target.value})} />
      <div className='lg:col-span-2 col-span-1 my-auto'>Location:</div>
      <input className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1' required type="text" id='location' name='location' value={eventInfo.location} onChange={(e) => setEventInfo({...eventInfo, location: e.target.value})} />
      <div className='lg:col-span-2 col-span-1 my-auto'>Start Time:</div>
      <DatePicker
        id='start-time'
        name='start-time'
        selected={eventInfo.starttime}
        onChange={(dateTime) => setEventInfo({...eventInfo, starttime: dateTime})}
        showTimeSelect
        timeIntervals={15}
        required
        wrapperClassName='lg:col-span-10 col-span-2 rounded-md shadow-md p-2 bg-white '
        className='lg:col-span-10 w-full rounded-md h-max  absolute top-0 bottom-0 bg-white mt-auto mb-auto p-1'
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <div className='lg:col-span-2 col-span-1 my-auto'>End Time:</div>
      <DatePicker
        id='end-time'
        name='end-time'
        selected={eventInfo.endtime}
        onChange={(dateTime) => setEventInfo({...eventInfo, endtime: dateTime})}
        showTimeSelect
        timeIntervals={15}
        wrapperClassName='lg:col-span-10 col-span-2 rounded-md shadow-md p-2 bg-white '
        className='lg:col-span-10 w-full h-max rounded-md absolute top-0 bottom-0 bg-white mt-auto mb-auto p-1'
        required
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <div className='lg:col-span-2 col-span-1 my-auto'>Capacity:</div>
      <input className='lg:col-span-10 col-span-2 rounded-md shadow-md p-1' type="text" id='vendor-capacity' name='location' value={eventInfo.vendorCapacity} onChange={(e) => setEventInfo({...eventInfo, vendorCapacity: e.target.value})} />
      <button type='submit' className='bg-blue lg:col-span-8 col-span-2 rounded-md shadow-sm text-white p-1 '>{editEvent ? 'Save Changes' : 'Add Event'}</button>
      <button type='button' className='bg-red lg:col-span-4 col-span-1 rounded-md shadow-sm text-white p-1 ' onClick={() => closeModal()}>Cancel</button>
    </form>

  );
}

export default function Events({eventService}) {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const {user} = useContext(Context);
  const [modal, setModal] = useState(false);
  const [editEvent, setEditEvent] = useState(false);
  const [currEvent, setCurrEvent] = useState(null);

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

  async function handleSubmit(event) {
    // if we are editing an event we need to update the event
    console.log('Event', event);
    if (editEvent) {
      setEditEvent(true);
      setModal(false);
      const res = await eventService.updateEvent(currEvent.eventId, event);
      console.log('Res status', res.status);
      if (res !== undefined) {
        console.log('Event updated successfully');
        // const updatedEvents = await eventService.getAllEvents();
        // setEvents(updatedEvents);
      } else {
        console.error('Failed to update event');
      }
      setCurrEvent(null);
    } else { // else we are creating a new event
      setEditEvent(false);
      setModal(false);
      const res = await eventService.createEvent(event);
      if (res !== undefined) {
        console.log('Event added successfully');
        // const updatedEvents = await eventService.getAllEvents();
        // setEvents(updatedEvents);
      } else {
        console.error('Failed to add event');
      }
      setCurrEvent(null);
    }
  };

  function closeModal() {
    setCurrEvent(null);
    setModal(false);
  }

  const eventDisplay = (event) => {
    // Extract hours, minutes, and AM/PM from starttime and endtime
    const startTimeHours = event.starttime.slice(0, 2);
    const startTimeMinutes = event.starttime.slice(3, 5);
    const startTimeAMPM = event.starttime.slice(9);
    const endTimeHours = event.endtime.slice(0, 2);
    const endTimeMinutes = event.endtime.slice(3, 5);
    const endTimeAMPM = event.endtime.slice(9);

    return (
      <div className="bg-white shadow-lg absolute right-0 left-0 rounded-lg p-4 max-w-sm ml-4 mr-4 bm-4">
        <div className="mt-2">
          <div className="text-lg font-semibold text-gray-900">{event.name}</div>
          <div className="text-grey-5">{event.description}</div>
          <div className="mt-3 text-grey-5">
            {event.date} • {startTimeHours}:{startTimeMinutes} {startTimeAMPM} - {endTimeHours}:{endTimeMinutes} {endTimeAMPM}
          </div>
          <div className="mt-1 text-sm text-grey-5 relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2ZM12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z" />
            </svg>
            {event.location}
          </div>
          <Link to={`/events/:${event.eventId}`} className="mt-2 text-blue p-2 rounded-md inline-block">
            View Event Details
          </Link>
          {user && user.isadmin && <button onClick={() => {
            setEditEvent(true); setModal(true); setCurrEvent(event);
          }} className='hover:bg-blue absolute right-0 bottom-0 mr-6 mb-6 text-md text-blue px-1  bg-white'>Edit</button>}
        </div>
      </div>
    );
  };


  if (error) {
    return (
      <div className='w-full relative mx-auto flex flex-col justify-center pb-16'>
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>No Events Found</h1>
        {!modal && user && user.isadmin && <button className='bg-white hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
          onClick={() => {
            setEditEvent(false); setModal(true);
          }}>Add Event</button>}
        {modal && (
          <EventModal editEvent={editEvent} handleSubmit={handleSubmit} closeModal={closeModal} currEvent={currEvent}/>
        )}
      </div>
    );
  }

  return (
    <>
      {modal && (
        <EventModal editEvent={editEvent} handleSubmit={handleSubmit} closeModal={closeModal} currEvent={currEvent}/>
      )}
      <div className={`${modal && 'blur-sm'} w-full mx-auto flex flex-col justify-center pb-16`}>
        <div className='static'>
          {!modal && user && user.isadmin && <button className='bg-white hover:bg-blue shadow-sm absolute right-0 text-black w-max m-2 p-2 rounded-lg'
            onClick={() => {
              setEditEvent(false); setModal(true);
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

EventModal.propTypes = {
  editEvent: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  currEvent: PropTypes.object,
};

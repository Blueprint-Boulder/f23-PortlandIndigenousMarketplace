import React, {useState, useContext} from 'react';

import Modal from '../components/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Context} from '../services/context';

export default function EditEventModal({event, eventService, setShowEditModal}) {
  const [eventInfo, setEventInfo] = useState(event);
  const {setBad, setMessage} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call your event service here to update the event

    const res = await eventService.updateEvent(event.eventId, eventInfo);
    if (res !== undefined) {
      // Toast with success message
      setMessage('Event updated successfully');
    } else {
      setBad(true);
      setMessage('Failed to update event');
    }
  };

  console.log('event', eventInfo);
  // console.log(`${eventInfo.startDate} ${eventInfo.starttime}`);

  const labelNames = 'flex flex-row justify-between basis-1/3';
  const fieldNames = 'basis-2/3 rounded drop-shadow p-1';

  return (
    <Modal className='flex flex-col gap-2 p-4' backgroundColor='bg-white' blurOnClick={()=>setShowEditModal(false)}>
      <div className='w-80'>
        <div className='flex flex-row justify-between items-center w-full mb-4'>
          <div className='w-5'>&nbsp;</div>
          <p className='font-bold'>Edit Event</p>
          <button className='w-5 bg-black text-white drop-shadow-xl' onClick={()=>setShowEditModal(false)}>X</button>
        </div>
        <form className='w-full text-left items-left flex flex-col gap-4' onSubmit={handleSubmit}>
          <label className={`${labelNames}`}>
            Name
            <input className={`${fieldNames}`} type="text" value={eventInfo.name} onChange={(e) => setEventInfo({...eventInfo, name: e.target.value})} />
          </label>
          <label className={`${labelNames}`}>
            Description
            <textarea className={`${fieldNames} min-h-20 h-40`} value={eventInfo.description} onChange={(e) => setEventInfo({...eventInfo, description: e.target.value})} />
          </label>
          <label className={`${labelNames}`}>
            Location
            <input className={`${fieldNames}`} type='text' value={eventInfo.location} onChange={(e) => setEventInfo({...eventInfo, location: e.target.value})} />
          </label>
          <label className={`${labelNames}`}>
            Start Date
            <DatePicker
              id='start-time'
              name='start-time'
              selected={eventInfo.starttime}
              onChange={(dateTime) => setEventInfo({...eventInfo, starttime: dateTime})}
              showTimeSelect
              timeIntervals={15}
              required
              wrapperClassName={`${fieldNames}`}
              className={`${fieldNames} w-full`}
              timeCaption="Time"
              dateFormat="M/dd/YYYY h:mm a"
              popperPlacement='top'
            />
          </label>
          <label className={`${labelNames}`}>
            End Date
            <DatePicker
              id='end-time'
              name='end-time'
              selected={eventInfo.endtime}
              onChange={(dateTime) => setEventInfo({...eventInfo, endtime: dateTime})}
              showTimeSelect
              timeIntervals={15}
              wrapperClassName={`${fieldNames}`}
              className={`${fieldNames} w-full`}
              required
              timeCaption="Time"
              dateFormat="M/dd/YYYY h:mm a"
            />
          </label>
          <label className={`${labelNames}`}>
            Capacity
            <input className={`${fieldNames}`} type='text' value={eventInfo.vendorCapacity} onChange={(e) => setEventInfo({...eventInfo, vendorCapacity: e.target.value})} />
          </label>
          <input type="submit" value="Submit" className='bg-blue mt-8 w-1/3 self-center rounded drop-shadow-lg py-1'/>
        </form>
      </div>
    </Modal>
  );
}

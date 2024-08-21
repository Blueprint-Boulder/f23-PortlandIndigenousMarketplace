import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../services/context';
import LeavingPageIcon from '../components/LeavingPageIcon';



export default function AttendingEvents({vendorId, vendorService}){
    const [events, setEvents] = useState([]);

    // Parses the start / end time to a human readable format
    const timeFormat = new Intl.DateTimeFormat('en', {
        timeStyle: 'short',
        dateStyle: 'short',
    });

    useEffect(() => {
        (async () => {
            setEvents(await vendorService.getVendorEvents(vendorId));
        })();
    }, [vendorId, vendorService]);
    
    return <>
        {
            events.map((event) => {
                console.log("Event: ", event);

                return <a href={`/events/${event.event_id}`} className='flex flex-row justify-around mx-3 my-1'>
                    <p className='font-bold'>{event.name}</p>
                    <p>{timeFormat.format(Date.parse(event.starttime))}</p>
                    <LeavingPageIcon />
                </a>;
            })
        }
    </>
}
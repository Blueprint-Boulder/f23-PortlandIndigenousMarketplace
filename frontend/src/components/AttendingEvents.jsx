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
    
    return <table className='w-full my-2'><tbody>
        {
            events !== undefined ? events.map((event) => {
                return <tr className='border-b border-black border-opacity-30'>
                    <td><a className='py-1 flex flex-row justify-around' href={`/events/${event.event_id}`}><p>{event.name}</p><LeavingPageIcon/></a></td>
                    <td align='right' className='py-1 content-end'>{timeFormat.format(Date.parse(event.starttime))}</td>
                </tr>
            }) : <></>
        }
    </tbody></table>
}
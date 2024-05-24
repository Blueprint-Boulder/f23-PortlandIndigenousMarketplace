import React, {useContext} from 'react';

import {Context} from '../services/context';
import {useNavigate} from 'react-router-dom';


export default function VendorEventCard({vendor, request, eventService}) {
  const {user, setMessage, setBad} = useContext(Context);
  const navigate = useNavigate();


  // console.log('LoadingCard:', vendor, request);

  // Sets approved to value
  const updateRequest = async (value) => {
    const res = await eventService.updateEventRequest(vendor.id, {approved: value});
    if (!res) {
      setMessage('Failed to update vendor request for event.');
      setBad(true);
    } else {
      // Should be checking the res status before saying this succeeded?
      setMessage('Vendor request updated for event.');
    }
    window.location.reload();
  };

  const AdminButtons = () => {
    if (user && user.isadmin) {
      if (request && request.approved) { // Show buttons to reject or set to pending
        return <div className='flex flex-row gap-3'>
          <button className='mt-3 text-white font-semibold drop-shadow-xl rounded-md bg-black w-24' onClick={() => updateRequest(false)}>Reject Request</button>
          <button className='mt-3 text-white font-semibold drop-shadow-xl rounded-md bg-black w-24' onClick={() => updateRequest(undefined)}>Set Pending</button>
        </div>;
      } else { // Show buttons to reject or approve
        return <div className='flex flex-row gap-3'>
          <button className='mt-3 text-gray-800 font-semibold drop-shadow-xl rounded-md bg-white w-24 click:text-white' onClick={() => updateRequest(true)}>Approve</button>
          <button className='mt-3 text-gray-800 font-semibold drop-shadow-xl rounded-md bg-white w-24 click:text-white' onClick={() => updateRequest(false)}>Reject Request</button>
        </div>;
      }
    } else { // Only admins need buttons to manage event requests
      return <></>;
    }
  };

  // console.log('vendreq', request);
  // console.log('vendvend', vendor);

  return (
    <div className='flex flex-col px-7 py-8 basis-1/2 gap-4 items-center bg-slate-50 rounded-lg drop-shadow-lg'
      onClick={()=> navigate(`/vendors/${vendor.id}`)}>
      <img src={vendor.image ? `/profilepics/${vendor.image}` : '/profile.webp'}></img>
      <p className='text-center'>{vendor.name}</p>
      {
        <AdminButtons></AdminButtons>
      }
    </div>
  );
}

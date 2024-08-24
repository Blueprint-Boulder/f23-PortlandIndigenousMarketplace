import React from 'react';
import VendorEventCard from './VendorEventCard';


export default function EventVendorsDisplay({user, showApproved, requests, vendors, eventService}) {
  console.log('EventVendorsDisplay Debug info: ', {
    showApproved,
    requests,
    vendors,
    eventService,
    user
  });

  const createCardsAdmin = (reqs) => {
    // console.log('create cards admin');
    return reqs.map((req) => {
      // No vendors have requested to attend this event
      if (vendors.length === 0) return <></>;
      
      // Returning approved only - The request was not approved
      if (showApproved === true && req.approved !== true) return <></>;
      
      // Returning pending only - The request is not pending
      if (showApproved === false && ( req.approved !== null ) ) return <></>;

      // Fetch the vendor's profile
      const res = vendors.filter((v) => v.id === req.vendorId)[0];
      if (!res) {
        console.error("Vendor's id not found - even though it should have been.");
        return <></>;
      }

      // Return the card
      return <VendorEventCard key={res.id} vendor={res} request={req} eventService={eventService}></VendorEventCard>;
    });
  };

  const createCards = (vends) => {
    // console.log('create cards');
    return vends.map((vendor)=> {
      return <VendorEventCard key={vendor.id} vendor={vendor} request={undefined} eventService={eventService}></VendorEventCard>;
    });
  };

  return <div className='flex flex-wrap p-5 gap-4 justify-center'>
    {
      user && user.isadmin ? createCardsAdmin(requests) : createCards(vendors)
    }
  </div>;
}

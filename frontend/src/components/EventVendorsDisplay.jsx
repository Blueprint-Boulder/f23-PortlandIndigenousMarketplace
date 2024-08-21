import React from 'react';
import VendorEventCard from './VendorEventCard';


export default function EventVendorsDisplay({showApproved, requests, vendors, eventService}) {
  const createCardsAdmin = (reqs) => {
    // console.log('create cards admin');
    return reqs.map((req) => {
      console.log('Request:', req);
      console.log('Vendors:', vendors);

      // No vendors have requested to attend this event
      if (vendors.length === 0) return <></>;
      
      // Returning approved only - The request was not approved
      if (showApproved === true && req.approved !== true) return <></>;
      
      // Returning pending only - The request is not pending
      if (showApproved === false && ( req.approved !== null ) ) return <></>;


      // Fetch the vendor's profile
      const res = vendors.filter((v) => v.id === req.vendorId)[0];
      console.log('Vendor Value:', res);

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
      requests.length > 0 ? createCardsAdmin(requests) : createCards(vendors)
    }
  </div>;
}

import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

export default function Vendors({VendorService}) {
  const [vendors, setVendors] = useState(VendorService.getVendors());

  const handleSearch = (vendor) => {
    vendor ? setVendors(VendorService.getVendorByName(vendor)) : setVendors(VendorService.getVendors());
  };

  const vendorDisplay = (vendor) => (
    <div className="flex flex-col p-2 bg-grey-2 my-2 rounded h-max ">
      <div className='flex justify-between'>
        <h2 className='text-black'>{vendor.name}</h2>
        <Link className='text-salmon' to={`/vendors/:${vendor.id}`}><FontAwesomeIcon icon={faArrowRight} /></Link>
      </div>
    </div>
  );

  return (
    <div className='h-[80vh] w-screen p-2 flex flex-col items-left justify-between gap-2'>
      <h1 className='color-white text-xl'>Vendors</h1>
      <input type='text' placeholder='Search for a vendor' className='w-11/12 rounded p-2' onChange={ (e) => handleSearch(e.target.value)}></input>
      <div className='grid grid-cols-2 gap-x-2 overflow-scroll h-full'>
        {
          vendors && (Array.isArray(vendors) ? vendors.map((vendor, i) => (
            <li className='[list-style:none]' key={i}>{vendorDisplay(vendor)}</li>
          )) : vendorDisplay(vendors))
        }
      </div>
    </div>

  );
}

Vendors.propTypes = {
  VendorService: PropTypes.func.isRequired,
};

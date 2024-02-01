import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {messageModal} from '../components/messagemodal.jsx';
// import {Link} from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

function VendorButton({content, onClick}) {
  return (
    <button className='bg-blue text-white m-1 p-2 rounded-lg' onClick={ () => onClick}> {content}</button>
  );
}

export default function Vendors({VendorService}) {
  const [vendors, setVendors] = useState(VendorService.getVendors());

  const handleSearch = (vendor) => {
    vendor ? setVendors(VendorService.getVendorByName(vendor)) : setVendors(VendorService.getVendors());
  };

  const handleMessage = () => {
    messageModal();
  };

  const vendorDisplay = (vendor) => (
    <div className="grid grid-cols-2 p-2 my-2 rounded h-max grid-rows-4 bg-white drop-shadow-md">
      <img className='w-14 mx-auto my-auto row-span-2 rounded-full bg-white' src={vendor.image} alt='vendor image'/>
      <h2 className='text-black mx-auto my-auto row-span-2 text-black font-bold'>{vendor.name}</h2>
      <VendorButton onClick={() => handleInvite()} content='Invite'/>
      <VendorButton onClick={() => handleMessage()} content='Message'/>
      <VendorButton onClick={() => handleFlag()} content='Flag'/>
      <VendorButton onClick={() => handlePromote()} content='Promote'/>
    </div>
  );
  return (
    <div className=' w-screen pl-2 pr-2 flex flex-col items-left justify-between gap-2'>
      <h1 className='color-white text-xl'>Vendors</h1>
      <input type='text' placeholder='Search for a vendor' className='w-11/12 rounded p-2' onChange={(e) => handleSearch(e.target.value)}></input>
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

VendorButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
// import MessageModal from '../components/messagemodal.jsx';
import {useNavigate} from 'react-router-dom';
import {Context} from '../services/context';
// import {Link} from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

import FooterPad from '../components/footerpad.jsx';

function VendorButton({content, onClick}) {
  return (
    <button className='bg-blue text-white m-1 p-2 rounded-lg' onClick={onClick}> {content}</button> // changed the way this onclick works, wasnt working before
  );
}

export default function Vendors({vendorService}) {
  const [vendors, setVendors] = useState(false);
  // const [vendor, setVendor] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const {setMessage, setBad, user} = useContext(Context);

  useEffect(() => {
    const fetchVendors = async () => {
      if (!vendors) {
        try {
          const fetchedVendors = await vendorService.getVendors();
          if (fetchedVendors.length === 0) {
            console.error('No vendors found');
          } else {
            setVendors(fetchedVendors);
            setError('');
          }
        } catch (error) {
          setError(true);
          console.error('Error fetching vendors:', error);
          setError('Failed to fetch vendors.');
        }
      }
    };

    fetchVendors();
    if (user === undefined) {
      setMessage('Please log in');
      setBad(true);
      navigate('/');
    }
  }, [vendorService, user, vendors]);

  const handleSearch = (vendor) => {
    const newvendors = vendors;
    const hammingDistance = (str1, str2) => {
      if (str1.length === 0 || str2.length === 0) {
        setVendors(false); // should trigger useEffect
      }
      if (str1.length !== str2.length) {
        (str1.length < str2.length) ?// normalize length
          str1 += ' '.repeat(str2.length - str1.length) :
          str2 += ' '.repeat(str1.length - str2.length);
      }
      let distance = 0;
      for (let i = 0; i < str1.length; i += 1) { // get hamming distance
        if (str1[i] !== str2[i]) distance += 1;
      }
      return distance;
    };
    // dont look at this part ;)
    const distances = newvendors.map((v) => hammingDistance(v.name, vendor));
    const zipped = newvendors.map((v, i) => [v, distances[i]]);
    zipped.sort((a, b) => a[1] - b[1]);
    const unzipped = zipped.map((z) => z[0]);
    setVendors(unzipped);
  };

  // const handleMessage = (vendor) => {
  //   setVendor(vendor);
  //   setOpenModal(true);
  // };

  const vendorDisplay = (vendor) => (
    <div className="bg-white shadow-lg rounded-lg p-4 w-64 max-w-sm mx-auto bm-4" onClick={() => navigate(`/vendors/:${vendor.id}`)}>
      <div className="mt-2">
        <div className="text-lg font-semibold text-gray-900">{vendor.name}</div>
        <div className="text-blue underline">{vendor.website}</div>
        <div className="mt-1 text-grey-5">{vendor.phoneNumber}</div>
        <div className="mt-1 text-grey-5 relative">
          {vendor.email}
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className='w-full mx-auto flex flex-col justify-center pb-16'>
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>No Vendors Found</h1>
      </div>
    );
  }

  return (
    <div className='w-full mx-auto flex flex-col justify-center pb-16'>
      <div className='static'>
        <h1 className='color-white text-2xl text-center my-3 font-semibold'>Vendors</h1>
      </div>
      <input type='text' placeholder='Search for a vendor' className='w-11/12 mx-auto my-2 rounded p-2 ' onChange={(e) => handleSearch(e.target.value)}></input>

      <div className='flex flex-col space-y-4'>
        {
          vendors && (Array.isArray(vendors) ? vendors.map((vendor, i) => (
            <li className='[list-style:none]' key={i}>{vendorDisplay(vendor)}</li>
          )) : vendorDisplay(vendors))
        }
      </div>
      <FooterPad/>
    </div>
    // <div className=' w-screen pl-2 pr-2 flex flex-col items-left justify-between gap-2'>
    //   <h1 className='color-white text-xl'>Vendors</h1>
    //   <input type='text' placeholder='Search for a vendor' className='w-11/12 rounded p-2' onChange={(e) => handleSearch(e.target.value)}></input>
    //   <div className='grid grid-cols-2 gap-x-2 overflow-scroll h-full'>
    //     {
    //       vendors && (Array.isArray(vendors) ? vendors.map((vendor, i) => (
    //         <li className='[list-style:none]' key={i}>{vendorDisplay(vendor)}</li>
    //       )) : vendorDisplay(vendors))
    //     }
    //   </div>
    //   {/* {openModal && <MessageModal closeModal={setOpenModal} vendor={vendor} />} */}
    //   <FooterPad />
    // </div>

  );
}

Vendors.propTypes = {
  vendorService: PropTypes.shape({
    getVendors: PropTypes.func.isRequired,
    getVendorByName: PropTypes.func.isRequired,
  }).isRequired,
};

VendorButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

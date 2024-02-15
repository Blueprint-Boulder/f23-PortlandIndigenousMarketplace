import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import {Context} from '../services/context';
// import {Link} from 'react-router-dom';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import {faArrowRight} from '@fortawesome/free-solid-svg-icons';

function VendorButton({content, onClick}) {
  return (
    <button className='bg-blue text-white m-1 p-2 rounded-lg' onClick={onClick}> {content}</button>
  );
}

export default function Vendors({vendorService}) {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');
  const {user, setMessage, setBad} = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const fetchedVendors = await vendorService.getVendors();
        if (fetchedVendors.length === 0) {
          console.error('No vendors found');
        } else {
          setVendors(fetchedVendors);
          setError('');
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
        setError('Failed to fetch vendors.');
      }
    };

    fetchVendors();
    if (!user) {
      setMessage('Please log in');
      setBad(true);
      navigate('/');
    }
  }, [vendorService, user]);

  const handleSearch = (vendor) => {
    vendor ? setVendors(vendorService.getVendorByName(vendor)) : setVendors(vendorService.getVendors());
  };

  const vendorDisplay = (vendor) => (
    <div className="grid grid-cols-2 p-2 my-2 rounded h-max grid-rows-4 bg-white drop-shadow-md">
      <img className='w-14 mx-auto my-auto row-span-2 rounded-full bg-white' src={vendor.image} alt='vendor image' />
      <h2 className='text-black mx-auto my-auto row-span-2 text-black font-bold'>{vendor.name}</h2>
      <VendorButton onClick={() => setMessage('please write my code')} content='Invite' />
      <VendorButton onClick={() => setMessage('please write my code')} content='Message' />
      <VendorButton onClick={() => navigate(`/vendors/:${vendor.id}`)} content='View' />
      <VendorButton onClick={() => setMessage('please write my code')} content='Promote' />
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
  vendorService: PropTypes.shape({
    getVendors: PropTypes.func.isRequired,
    getVendorByName: PropTypes.func.isRequired,
  }).isRequired,
};

VendorButton.propTypes = {
  content: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

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
  const [vendors, setVendors] = useState(null);
  // const [vendor, setVendor] = useState({});
  // const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(false);   
  const navigate = useNavigate();
  const {setMessage, setBad, user} = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      if (!vendors) {
        try {
          const fetchedVendors = await vendorService.getPublicVendors();
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
  }, [vendorService, user, vendors]);

  /**
   * Calculate the Hamming Distance between two strings, ignoring spaces.
   * @param {string} str1 - First string
   * @param {string} str2 - Second string
   * @returns {number} Hamming Distance between the two strings
   */
  const hammingDistance = (str1, str2) => {
    if (str1.length === 0 || str2.length === 0) {
      return 0;
    }
    if (str1.length !== str2.length) {
      (str1.length < str2.length) ?// normalize length
        str1 += ' '.repeat(str2.length - str1.length) :
        str2 += ' '.repeat(str1.length - str2.length);
    }
    let distance = 0;
    for (let i = 0; i < str1.length; i += 1) { // get hamming distance
      if (str1[i] !== str2[i]) {
        if (str1[i] === ' ' || str2[i] === ' ') continue; // ignore spaces
        distance += 1;
      }
    }
    return distance;
  };

  /*
  Given vendors a and b, calculates an aggregate hamming distance between the
  words in the vendor's name, and the words in the search term.

  Used to sort vendors after initial pass by filter method below.
  */
  const sortVendors = (a, b) => {
    // Split Search term by words
    const searchTerms = searchTerm.split(' ');

    // Split each vendor name by words
    const vendorA = a.name.split(' ');
    const vendorB = b.name.split(' ');

    let distanceA = 0;
    let distanceB = 0;

    // Calculate hamming distance of each word in search term to each word of vendor name
    for (const term of searchTerms) {
      for (const word of vendorA) {
        distanceA += hammingDistance(word.toLowerCase(), term.toLowerCase());
      }

      for (const word of vendorB) {
        distanceB += hammingDistance(word.toLowerCase(), term.toLowerCase());
      }
    }

    return distanceA - distanceB;
  } 

  // Returns true if search term makes up at least part of the vendor's name
  const filterVendors = (vendor) => {
    // Split search term by words
    const searchTerms = searchTerm.split(' ');

    // Split each vendor name by words
    const vendorName = vendor.name.split(' ');

    // Check if any word in search term is included in any string in vendor name
    for (const term of searchTerms) {
      for (const word of vendorName) {
        if (word.toLowerCase().includes(term.toLowerCase())) {
          return true;
        }
      }
    }

    return false;
  }

  const vendorDisplay = (vendor) => (
    <div className="bg-greywhite shadow-lg rounded-lg p-4 w-10/12 max-w-sm mx-auto bm-4" onClick={() => navigate(`/vendors/${vendor.id}`)}>
      <div className = 'flex justify-between'>
        <div className="mt-2 ">
          <img src={vendor.image ? `/profilepics/${vendor.image}` : '/profile.webp'} alt={vendor.name} className="w-24 h-24 mx-auto rounded-full" />
        </div>
        <div className="mt-2 mx-2 w-6/12 truncate">
          <div className="text-lg font-semibold text-gray-900 truncate">{vendor.name}</div>
          <div className="text-blue underline truncate">{vendor.website}</div>
          <div className="mt-1 text-grey-5 truncate">{vendor.phoneNumber && `${vendor.phoneNumber}`}</div>
          <div className="mt-1 text-grey-5 relative truncate">
            {vendor.email}
          </div>
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
      <input type='text' placeholder='Search for a vendor' className='border-2 w-9/12 mx-auto my-2 rounded p-2' onChange={(e) => setSearchTerm(e.target.value)}></input>

      <div className='flex flex-col space-y-4 mt-2'>
        {
          vendors && (Array.isArray(vendors) ? vendors.filter((vendor) => filterVendors(vendor)).sort(sortVendors).map((vendor, i) => (
            <li className='[list-style:none]' key={i}>{vendorDisplay(vendor)}</li>
          )) : vendorDisplay(vendors))
        }
      </div>
      <FooterPad/>
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

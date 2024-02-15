import React, {useEffect, useContext, useState} from 'react';
import handbook from './../assets/Handbook.png';
import {Link, useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Context} from '../services/context';
import Modal from '../components/modal.jsx';

export default function Profile({vendorService}) {
  const navigate = useNavigate();
  const {user, setMessage, setBad} = useContext(Context);
  const [modal, setModal] = useState(false);
  const {vendorId} = useParams();
  const id = parseInt(vendorId.slice(1));
  const [vendor] = useState(vendorService.getVendorById(id));

  useEffect(() => {
    if (!user) {
      setMessage('Please log in');
      setBad(true);
      navigate('/');
    } else if (user.isadmin) {
      setMessage('What should an admin see?');
    }
  }, [navigate, user]);
  function handleEdit() {
    setModal(true);
  }
  return (

    <div className='items-center h-[80vh] w-screen flex flex-col space-y-4 items-center'>
      {/* Boilerplate code for the edit button and modal*/}
      {user.id === id && !modal && <button onClick={() => handleEdit()}>Edit</button>}
      {modal && <Modal setModal = {setModal} message = 'This should be an edit profile modal'/>}
      {/* End of boilerplate code */}
      <div className='flex flex-row items-center bg-white p-2 px-5 w-10/12 rounded-lg drop-shadow-xl'>
        <div className='rounded-full'>
          <img className='w-20' src={vendor.image} alt="" />
        </div>
        <h1 className='text-xl ml-4'>{vendor.name}</h1>
      </div>
      <hr className='bg-grey-1 w-9/12 drop-shadow-lg'/>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4'>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>{vendor.email}</li>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>{vendor.phone_number}</li>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>{vendor.website}</li>
        <li className='[list-style:none] bg-white rounded-full p-2 drop-shadow-lg'>Location</li>
      </div>
      <div className='bg-white w-10/12 p-2 rounded-lg drop-shadow-lg'>
        <h1 className='text-xl'>Upcoming Events</h1>
        <p>Insert upcoming events modal/reference here</p>
      </div>
      <div className='bg-white w-10/12 p-2 rounded-lg drop-shadow-lg'>
        <div className='flex flex-row justify-between'>
          <h1 className='flex-1'>Violations</h1>
        </div>
        <div className='flex flex-col items-center drop-shadow-lg'>
          <Link to='/handbook'><img src={handbook} alt="Policy Handbook" /></Link>
          <h1 className='text-xl w-auto font-bold'>Policy Handbook</h1>
        </div>
      </div>

    </div>

  );
}

Profile.propTypes = {
  vendorService: PropTypes.shape({
    getVendorById: PropTypes.func.isRequired,
  }).isRequired,
};


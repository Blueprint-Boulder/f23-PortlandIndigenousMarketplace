import React, {useEffect, useContext, useState} from 'react';
import handbook from './../assets/Handbook.png';
import {useNavigate, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Context} from '../services/context';
import FooterPad from '../components/footerpad';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons';
import {faYoutube} from '@fortawesome/free-brands-svg-icons';
import {faPinterest} from '@fortawesome/free-brands-svg-icons';
import {faTiktok} from '@fortawesome/free-brands-svg-icons';
import LeavingPageIcon from '../components/LeavingPageIcon';

// Import the Modal used for uploading a new profile picture
import UploadPhotoModal from '../components/UploadPhotoModal';
import ViolationModal from '../components/violationmodal';
import EditProfileModal from '../components/EditProfileModal';
import PolicyModal from '../components/PolicyModal';
import AttendingEvents from '../components/AttendingEvents.jsx';


export default function Profile({vendorService, violationService}) {
  const {vendorId} = useParams();
  const [vendor, setVendor] = useState({});
  const [openViolation, setOpenViolation] = useState(false);
  const [numViolations, setNumViolations] = useState(0);
  const [editModal, setEditModal] = useState(false);
  const [policyModal, setPolicyModal] = useState(false);
  const {user, setMessage, setBad} = useContext(Context);
  const [vendorData, setVendorData] = useState({name: '', email: '', phoneNumber: '', website: ''});

  // When true, the upload profile modal appears
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Used to refresh the profile image
  const [profileImage, setProfileImage] = useState('/profile.webp');

  // When true, the profile image is covered to show the edit button
  const [uploadNewImage, setUploadNewImage] = useState(false);


  const navigate = useNavigate();

  useEffect(() => {
    // if (!user) {
    //   setMessage('Please log in');
    //   setBad(true);
    //   navigate('/');
    // }

    const fetchData = async () => {
      const vendorData = await vendorService.getVendorById(vendorId);
      if (!vendorData) {
        setMessage('Vendor not found');
        setBad(true);
        navigate('/vendors');
      } else {
        setVendor(vendorData);
        setVendorData(vendorData);
        console.log('Vendor:', vendorData);
      }
      try {
        const violationData = await violationService.getViolationsByVendorId(vendorId);
        setNumViolations(violationData.length);
      } catch (err) {
        console.log('Error fetching violations:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setProfileImage(vendor.image == undefined ? '/profile.webp' : `/profilepics/${vendor.image}`);
  }, [vendor.image]);

  const handleViolation = () => {
    setOpenViolation(true);
  };

  const handleEditVendor = async () => {
    if (!user.isadmin) {
      const response = await vendorService.updateSelfVendor(vendorData);
      if (response) {
        setMessage('Updated succesfully');
        const vendorData = await vendorService.getVendorById(vendorId);
        setVendor(vendorData);
      } else {
        setBad(true);
        setMessage('Failed to update');
      }
    } else {
      console.log('Vendor data:', vendorData);
      const response = await vendorService.updateVendor(vendorData);
      if (response) {
        setMessage('Updated succesfully');
        const vendorData = await vendorService.getVendorById(vendorId);
        setVendor(vendorData);
      } else {
        setBad(true);
        setMessage('Failed to update');
      }
    }
  };


  async function handleViolationSubmit(violation) {
    setOpenViolation(false); // close the modal
    // typically we would want to call this variable res or response
    const newViolation = await violationService.createViolation(violation);
    // ask: should I use try catch to account for errors ? Try catch is good, but typically if everything is working the backend will handle it, at least in this case
    if (newViolation !== undefined) {
      console.log('Violation added successfully');
    } else {
      console.log('Failed to add violation');
    }

    setNumViolations(numViolations + 1);
  };

  return (
    <div className='items-center w-screen flex flex-col z-1 space-y-4 items-center gap-3'>
      {
        showUploadModal ? <UploadPhotoModal vendorId={vendorId} vendorService={vendorService} showUploadModal={showUploadModal} setShowUploadModal={setShowUploadModal}></UploadPhotoModal> : <></>
      }
      <div className='flex flex-col gap-2 bg-white p-2 px-5 w-10/12 rounded-lg drop-shadow-xl'>
        <div className='flex flex-row items-center'>
            <figure className='w-20 h-fit align-middle' onClick={() => {
              setShowUploadModal(!showUploadModal);
            }}
            onMouseEnter={() => {
              setUploadNewImage(true);
            }}
            onMouseLeave={()=> {
              setUploadNewImage(false);
            }}>
              {
                // If hovering profile image, gray image and show "Upload" text. Only works on desktop
                uploadNewImage && <figcaption className='absolute w-20 h-5/6 bg-black/50'>
                  <p className='text-white text-center top-0 transform translate-y-2/3'>Upload</p>
                </figcaption>
              }
              <img className='w-20' src={profileImage} alt="vendor profile pic"/>
            </figure>
            <>
              <div className='flex flex-col'>
                {(() => {
                  return vendor.website ? 
                  <a className='flex flex-row gap-2' href={'https://' + vendor.website} target='_blank' rel="noreferrer">
                    <h1 className='text-3xl ml-4'>{vendor.name}</h1>
                    <LeavingPageIcon />
                  </a> : vendor.name;
              })()}<p className='px-4 text-m text-slate-500'>
                { vendor.email && <li className='[list-style:none]'>{<a href={vendor.email}>{vendor.email}</a>}</li> }
                { vendor.phoneNumber && <li className='[list-style:none]'>{vendor.phoneNumber}</li> }
                { vendor.website && <li className='[list-style:none]'>{<a href={'https://' + vendor.website}>{vendor.website}</a>}</li> }
              </p>
              </div>
              </>
            {
              (user.id === vendorId || user.isadmin ) &&
              <button className='ml-auto' onClick={() => {
                setEditModal(true);
              }}>Edit</button>
            }
          </div>
          <hr className="h-px mt-3 w-5/6 border-0 bg-black self-center opacity-25"></hr>
          <div className='flex flex-row gap-4 justify-center'>
            {vendor.instagram && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={vendor.instagram} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x"/></a></li>}
            {vendor.twitter && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={vendor.twitter} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faXTwitter} size="2x"/></a></li>}
            {vendor.facebook && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={vendor.facebook} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x"/></a></li>}
            {vendor.youtube && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={vendor.youtube} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faYoutube} size="2x"/></a></li>}
            {vendor.pinterest && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={vendor.pinterest} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faPinterest} size="2x"/></a></li>}
            {vendor.tiktok && <li className='[list-style:none] p-2 drop-shadow-lg'><a href={vendor.tiktok} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTiktok} size="2x"/></a></li>}
          </div>
      </div>
      <div className='bg-white w-10/12 p-2 rounded-lg drop-shadow-lg'>
        <h1 className='text-xl'>Upcoming Events</h1>
        <AttendingEvents vendorService={vendorService} vendorId={vendorId}></AttendingEvents>
      </div>
      { /* Only show policy modal if user is logged in*/
      user && <div className='bg-white w-10/12 p-2 rounded-lg drop-shadow-lg'>
        <div className='flex flex-row justify-between'>
          <h1 className='flex-1'>Violations: {numViolations}</h1>
          {user.isadmin && (
            <button className="bg-red drop-shadow-xl border border-0 rounded-md py-2 px-1 w-4/12 h-2/12" onClick={() => handleViolation()}>Add A Violation</button>
          )}
        </div>
        <div className='flex flex-col items-center drop-shadow-lg'>
          <button onClick={() => {
            setPolicyModal(true);
          }}>
            <img src={handbook} alt="Policy Handbook" />
          </button>

          <h1 className='text-xl w-auto font-bold'>Policy Handbook</h1>
        </div>
      </div>}
      <>
        {openViolation && (
          <ViolationModal closeModal={setOpenViolation} vendorId={vendorId} vendorName={vendor.name}handleSubmit={handleViolationSubmit} />
        )}
        <div className={`${openViolation ? 'blur' : ''} w-full h-full mx-auto pb-16`}></div>
      </>
      {
        editModal && (
          <EditProfileModal setShowUploadModal = {setShowUploadModal} handleSubmit = {handleEditVendor} setEditModal = {setEditModal}
            vendorData = {vendorData} setVendorData={setVendorData} user = {user}></EditProfileModal>
        )
      }
      {
        policyModal && ( <PolicyModal setPolicyModal={setPolicyModal}></PolicyModal> )
      }
      <FooterPad/>
    </div>

  );
}

Profile.propTypes = {
  vendorService: PropTypes.shape({
    getVendorById: PropTypes.func.isRequired,
    updateSelfVendor: PropTypes.func.isRequired,
    updateVendor: PropTypes.func.isRequired,
  }).isRequired,
  violationService: PropTypes.shape({
    createViolation: PropTypes.func.isRequired,
    getViolationsByVendorId: PropTypes.func.isRequired,
  }).isRequired,
};

EditProfileModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  setEditModal: PropTypes.func.isRequired,
  vendorData: PropTypes.object.isRequired,
  setVendorData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

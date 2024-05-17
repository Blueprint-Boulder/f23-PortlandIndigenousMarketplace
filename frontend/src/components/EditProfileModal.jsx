import React, {useState} from 'react';


import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {faCaretUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


export default function EditModal({handleSubmit, setEditModal, vendorData, setVendorData, user, setShowUploadModal}) {
  const [badLocal, setBadLocal] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validWebsite, setValidWebsite] = useState(true);
  const [validPass, setValidPass] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleWebsiteChange = (e) => {
    const website = e.target.value;
    const pattern = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (website === '') {
      setValidWebsite(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(website)) {
      // The website input matches the pattern
      setVendorData({...vendorData, website: website});
      setBadLocal(false);
      setValidWebsite(true);
    } else {
      // The website input does not match the pattern
      setValidWebsite(false);
      setBadLocal(true);
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
    if (email === '') {
      setValidEmail(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(email)) {
      setVendorData({...vendorData, email: email});
      setBadLocal(false);
      setValidEmail(true);
    } else {
      // The website input does not match the pattern
      setValidEmail(false);
      setBadLocal(true);
    }
  };

  function handlePassValid(e) {
    if (e.target.value !== vendorData.password) {
      setValidPass(false);
      setBadLocal(true);
      console.log('Vendor Data:', vendorData);
    } else {
      setBadLocal(false);
      setValidPass(true);
    }
  }

  function handleChecked() {
    setChecked(!checked);
    if (!checked) {
      if ('password' in vendorData) { // make sure password is not changed on accident
        delete vendorData.password;
      }
    }
  }


  return (
    <div className='absolute bg-white rounded-md p-5 drop-shadow-lg w-11/12 h-5/6 overflow-scroll'>
      <div className='flex flex-col h-full'>
        <form action="" onSubmit={(e) => {
          if (badLocal) {
            e.preventDefault();
            return;
          }
          e.preventDefault(); // Prevents the default form submission behavior
          handleSubmit();
          setEditModal(false);
        }} className='flex flex-col'>
          <label htmlFor="legalName" className='py-4' >Name:</label>
          <input type="text" id='legalName' placeholder = {vendorData.name} name='legalName'onChange={(e) => setVendorData({...vendorData, name: e.target.value})}/>
          {!validEmail && <div className="bg-red text-white text-center  pt-2 h-10 w-full z-50">Must be a valid email.</div>}
          <label htmlFor="email" className='py-4'>Email:</label>
          <input type="text" id='email' placeholder = {vendorData.email} name='email'onChange={(e) => handleEmailChange(e)}/>
          {user.isadmin &&
            <div className='py-4 w-full flex'>
              <div>Reset Password</div>
              <div onClick= {() => handleChecked()} className='mx-4' >
                <FontAwesomeIcon icon = {checked? faCaretUp: faCaretDown}/>
              </div>
            </div>
          }
          {checked &&
            <>
              <label htmlFor="email" className='py-4'>New Password:</label>
              <input type="password" id='email' name='email'onChange={(e) => setVendorData({...vendorData, password: e.target.value})}/>
              <label htmlFor="email" className='py-4'>ReEnter Password:</label>
              <input type="password" id='email' name='email'onChange={(e) => handlePassValid(e)}/>
              {!validPass && <div className="bg-red text-white text-center  pt-2 h-10 w-full z-50">Passwords do not match.</div>}
            </>
          }
          <label htmlFor="phoneNum" className='py-4'>Phone Number:</label>
          <input type="text" id='phoneNum' placeholder = {vendorData.phoneNumber} name='phoneNum'onChange={(e) => setVendorData({...vendorData, phoneNumber: e.target.value})}/>
          {!validWebsite && <div className="bg-red text-white text-center  pt-2 h-10 w-full z-50">Must be a valid website.</div>}
          <label htmlFor="website" className='py-4'>Website:</label>
          <input type="text" id='website' placeholder = {vendorData.website} name='website'onChange={(e) => handleWebsiteChange(e)}/>
          <label htmlFor = 'instagram' className='py-4'>Instagram:</label>
          <input type="text" id='instagram' placeholder = {vendorData.instagram} name='instagram'onChange={(e) => setVendorData({...vendorData, instagram: e.target.value})}/>
          <label htmlFor = 'facebook' className='py-4'>Facebook:</label>
          <input type="text" id='facebook' placeholder = {vendorData.facebook} name='facebook'onChange={(e) => setVendorData({...vendorData, facebook: e.target.value})}/>
          <label htmlFor = 'twitter' className='py-4'>Twitter:</label>
          <input type="text" id='twitter' placeholder = {vendorData.twitter} name='twitter'onChange={(e) => setVendorData({...vendorData, twitter: e.target.value})}/>
          <label htmlFor = 'youtube' className='py-4'>Youtube:</label>
          <input type="text" id='youtube' placeholder = {vendorData.youtube} name='youtube'onChange={(e) => setVendorData({...vendorData, youtube: e.target.value})}/>
          <label htmlFor = 'pinterest' className='py-4'>Pinterest:</label>
          <input type="text" id='pinterest' placeholder = {vendorData.pinterest} name='pinterest'onChange={(e) => setVendorData({...vendorData, pinterest: e.target.value})}/>
          <label htmlFor = 'tiktok' className='py-4'>Tiktok:</label>
          <input type="text" id='tiktok' placeholder = {vendorData.tiktok} name='tiktok'onChange={(e) => setVendorData({...vendorData, tiktok: e.target.value})}/>
          <div className='flex justify-between bottom-0'>
            <button type={badLocal ? '': 'submit'} className={`${badLocal ? 'bg-grey-1': 'bg-blue'} text-white p-5 mt-8 mb-4`}>Save Changes</button>
            <button className='bg-grey-1 text-black p-5 mt-8 mb-4' onClick={() => {
              setEditModal(false);
              setShowUploadModal(true);
            }}>Upload Profile Photo</button>
            <button onClick={()=>{
              setEditModal(false);
            }} className='bg-red  text-white p-5 mt-8 mb-4 '>Cancel</button>
          </div>
        </form>

      </div>
    </div>
  );
}

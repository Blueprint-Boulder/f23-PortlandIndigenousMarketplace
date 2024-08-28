import React, { useState } from 'react';

import Modal from './Modal';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function EditModal({ handleSubmit, setEditModal, vendorData, setVendorData, user, setShowUploadModal }) {
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
      setVendorData({ ...vendorData, website: website });
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
      setVendorData({ ...vendorData, email: email });
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

  const inputClassnames = `w-5/6 h-10 border-2 border-grey-1 rounded-md p-2 basis-2/3`;
  const labelNames = 'flex flex-row justify-between';

  const btnClassnames = `basis-1/3 h-20 rounded-md font-semibold text-base py-1 px-1 drop-shadow-xl`;
  const activebuttonstyle = `text-white font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-whitegrey`;
  const disabledbuttonstyle = `text-white font-semibold py-2 px-1 drop-shadow-xl rounded-md bg-grey-1`;


  return (
    <Modal backgroundColor={'bg-greywhite h-5/6 w-5/6 z-20'} blurOnClick={() => setEditModal(false)}>
      <form action="" onSubmit={e => {
        if (badLocal) {
          e.preventDefault();
          return;
        }
        e.preventDefault(); // Prevents the default form submission behavior
        handleSubmit();
        setEditModal(false);
      }} className='flex flex-col gap-2'>
        <label htmlFor="legalName" className={`${labelNames}`} >
          Name:
          <input className={`${inputClassnames}`} type="text" id='legalName' placeholder={vendorData.name} name='legalName' onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })} />
        </label>
        {
          !validEmail && 
          <div className="bg-red text-white text-center  pt-2 h-10 w-full ">Must be a valid email.</div>
        }
        <label htmlFor="email" className={`${labelNames}`}>
          Email:
          <input className={`${inputClassnames}`} type="text" id='email' placeholder={vendorData.email} name='email' onChange={(e) => handleEmailChange(e)} />
        </label>
        { 
          user.isadmin &&
          <div className='py-4 w-full flex'>
            <div>Reset Password</div>
            <div onClick={() => handleChecked()} className='mx-4' >
              <FontAwesomeIcon icon={checked ? faCaretUp : faCaretDown} />
            </div>
          </div>
        }
        {
          checked &&
          <>
            <label htmlFor="email" className={`${labelNames}`}>
              New Password:
              <input className={`${inputClassnames}`} type="password" id='email' name='email' onChange={(e) => setVendorData({ ...vendorData, password: e.target.value })} />
            </label>
            <label htmlFor="email" className={`${labelNames}`}>
              Re-enter Password:
              <input className={`${inputClassnames}`} type="password" id='email' name='email' onChange={(e) => handlePassValid(e)} />
            </label>
            {
              !validPass && 
              <div className="bg-red text-white text-center  pt-2 h-10 w-full ">Passwords do not match.</div>
            }
          </>
        }
        <label htmlFor="phoneNum" className={`${labelNames}`}>
          Phone:
          <input className={`${inputClassnames}`} type="text" id='phoneNum' placeholder={vendorData.phoneNumber} name='phoneNum' onChange={(e) => setVendorData({ ...vendorData, phoneNumber: e.target.value })} />
        </label>
        {
          !validWebsite && 
          <div className="bg-red text-white text-center  pt-2 h-10 w-full ">Must be a valid website.</div>
        }
        <label htmlFor="website" className={`${labelNames}`}>
          Website:
          <input className={`${inputClassnames}`} type="text" id='website' placeholder={vendorData.website} name='website' onChange={(e) => handleWebsiteChange(e)} />
        </label>
        <label htmlFor='instagram' className={`${labelNames}`}>
          Instagram:
          <input className={`${inputClassnames}`} type="text" id='instagram' placeholder={vendorData.instagram} name='instagram' onChange={(e) => setVendorData({ ...vendorData, instagram: e.target.value })} />
        </label>
        <label htmlFor='facebook' className={`${labelNames}`}>
          Facebook:
          <input className={`${inputClassnames}`} type="text" id='facebook' placeholder={vendorData.facebook} name='facebook' onChange={(e) => setVendorData({ ...vendorData, facebook: e.target.value })} />
        </label>
        <label htmlFor='twitter' className={`${labelNames}`}>
          Twitter:
          <input className={`${inputClassnames}`} type="text" id='twitter' placeholder={vendorData.twitter} name='twitter' onChange={(e) => setVendorData({ ...vendorData, twitter: e.target.value })} />
        </label>
        <label htmlFor='youtube' className={`${labelNames}`}>
          Youtube:
          <input className={`${inputClassnames}`} type="text" id='youtube' placeholder={vendorData.youtube} name='youtube' onChange={(e) => setVendorData({ ...vendorData, youtube: e.target.value })} />
        </label>
        <label htmlFor='pinterest' className={`${labelNames}`}>
          Pinterest:
          <input className={`${inputClassnames}`} type="text" id='pinterest' placeholder={vendorData.pinterest} name='pinterest' onChange={(e) => setVendorData({ ...vendorData, pinterest: e.target.value })} />
        </label>
        <label htmlFor='tiktok' className={`${labelNames}`}>
          Tiktok:
          <input className={`${inputClassnames}`} type="text" id='tiktok' placeholder={vendorData.tiktok} name='tiktok' onChange={(e) => setVendorData({ ...vendorData, tiktok: e.target.value })} />
        </label>
        <div className='flex flex-row gap-3 mt-3'>
          <button type={badLocal ? '' : 'submit'} className={`${btnClassnames} ${badLocal ? 'bg-grey-1 text-grey-3 border-2 border-red' : `bg-black text-white`}`}>Save Changes</button>
          <button className={`bg-black text-white ${btnClassnames}`} onClick={() => {
            setEditModal(false);
            setShowUploadModal(true);
          }}>Upload Profile Photo</button>
          <button onClick={() => {
            setEditModal(false);
          }} className={`bg-black text-white ${btnClassnames}`}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

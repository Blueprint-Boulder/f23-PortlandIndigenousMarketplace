import React, {useContext} from 'react';

import {Context} from '../services/context';

export default function UploadPhotoModal({vendorId, vendorService, showUploadModal, setShowUploadModal}) {
  const {setMessage, setBad} = useContext(Context);

  const toggle = () => {
    setShowUploadModal(!showUploadModal);
  };

  const fileUpload = async (e) => {
    // Extract the file
    const image = e.target.files[0];
    if (image != undefined) {
      // Call the vendor service handler
      const res = await vendorService.uploadVendorPhoto(vendorId, image);

      if (res == undefined) {
        setBad(true);
        setMessage('Failed to upload profile image.');
        toggle();
      } else {
        setMessage('Uploaded profile image.');
        toggle();
      }
    } else {
      console.log('Error: No image found.');
    }
  };

  return (<>
    <div className='absolute backdrop-blur-md w-full h-full z-10'></div>
    <div className='absolute bg-white z-20 rounded-lg shadow-2xl flex flex-col gap-5 p-10 items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/4'>
      <h2>Upload Profile Picture</h2>
      <form>
        <input type="file" accept="image/*" onChange={fileUpload}></input>
      </form>
      <button onClick={toggle}>Close</button>
    </div>
  </>);
}

import React, {useContext} from 'react';

import Modal from './Modal';
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
    <Modal backgroundColor={'bg-greywhite'} blurOnClick={toggle}>
      <h1 className="font-bold">Upload Profile Picture</h1>
      <form>
        <input type="file" accept="image/*" onChange={fileUpload}></input>
      </form>
      <button onClick={toggle}>Close</button>
    </Modal>
  </>);
}

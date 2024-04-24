import React from 'react';

export default function UploadPhotoModal({vendorService, showUploadModal, setShowUploadModal}) {
  const toggle = () => {
    setShowUploadModal(!showUploadModal);
  };

  const fileUpload = (e) => {
    // Extract the file
    const image = e.target.files[0];
    if (image != undefined) {
      // Call the vendor service handler
      const res = vendorService.uploadVendorPhoto(image);

      console.log(res);
    } else {
      console.log('Error: No image found.');
    }

    // TODO: close modal ; make a toast for success / error
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

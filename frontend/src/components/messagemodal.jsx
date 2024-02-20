import React, {useState} from 'react';
import PropTypes from 'prop-types';


function MessageModal({closeModal, vendor}) { // added vendor object so we can send message to vendor
  const [message, setMessage] = useState('');
  function handleSubmit() {
    console.log(`Posting message(${message}) to ${vendor.name}`);
    console.log('... As long as someone finishes my code');
    closeModal(false);
  }
  // changed the code a little bit, easier to use react state and functions than form
  return (
    <div className="fixed inset-y-96 inset-x-14 rounded-lg drop-shadow-xl bg-white w-9/12 h-40">
      <header className="flex flex-row w-auto bg-blue shadow-xl rounded-md pt-1 h-8 mb-2 pl-1">
        <h3 className="text-white">Send A Message To {vendor.name}</h3>
      </header>
      <div className="grid grid-cols-3">
        <textarea className="ml-1 col-span-2 pl-2 pt-1 mb-1 rounded-lg drop-shadow-xl border border-2 border-blue placeholder:text-blue placeholder:italic shadow-inner" onChange={(e) => setMessage(e.target.value)} placeholder="Enter Message Here ..."></textarea>
        <footer className='mt-6 ml-5 pb-2'>
          <button className="bg-blue py-1 px-3 mb-2 mr-2 text-white drop-shadow-xl rounded-lg" onClick={() => handleSubmit()}>Send</button>
          <button className="bg-red py-1 px-2 mb-4 mr-2 text-white drop-shadow-xl rounded-lg" onClick={() => closeModal(false)}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default MessageModal;

MessageModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired,
};

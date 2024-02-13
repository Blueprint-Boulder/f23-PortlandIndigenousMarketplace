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
    <div className="fixed inset-0 backdrop-blur-sm bg-white w-50 h-50">
      <textarea onChange={(e) => setMessage(e.target.value)} placeholder="Enter Message Here ..."></textarea>
      <button onClick={() => closeModal(false)}>Cancel</button>
      <button onClick={() => handleSubmit()}>Send</button>
    </div>
  );
}

export default MessageModal;

MessageModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  vendor: PropTypes.object.isRequired,
};

import React, {useState} from 'react';
// import PropTypes from 'prop-types';

export default function Message() {
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  return (
    <>
      <button onClick={toggleModal}>Send Message</button>
      <div className="modal">
        <div onClick={toggleModal} className="w-screen h-screen fixed inset-0"></div>
        <div className="modal-content">
          <h2>Hello Modal</h2>
          <p>lorem ipsum</p>
          <button className="close-modal" onClick={toggeModal}>Close</button>
        </div>
      </div>
    </>
  );
}

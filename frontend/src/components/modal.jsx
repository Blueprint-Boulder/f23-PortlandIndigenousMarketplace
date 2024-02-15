import React from 'react';
import PropTypes from 'prop-types';
export default function Modal({setModal, message}) {
  const toggleModal = () => {
    setModal(false);
  };

  return (
    <>
      <h1>Modal</h1>
      <div >{message}</div>
      <button onClick={toggleModal}> Close</button>
    </>

  );
}

Modal.propTypes = {
  message: PropTypes.string,
  setModal: PropTypes.func,
};

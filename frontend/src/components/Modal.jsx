import React from 'react';
import PropTypes from 'prop-types';
export default function Modal({children, backgroundColor, blurOnClick}) {
  return (<>
    <div className='fixed top-0 w-screen h-screen z-10 backdrop-blur-md' onClick={blurOnClick ? blurOnClick : ()=>{}}></div>
    <div className={`fixed ${backgroundColor} z-20 rounded-lg drop-shadow-2xl flex flex-col gap-5 p-10 items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll`}>
      {children}
    </div>
  </>);
}

Modal.propTypes = {
  message: PropTypes.string,
  setModal: PropTypes.func,
};

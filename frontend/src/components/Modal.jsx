import React from 'react';
import PropTypes from 'prop-types';
export default function Modal({children, backgroundColor, blurOnClick}) {
  return (<>
    <div className='absolute backdrop-blur-md w-full h-full z-10' onClick={blurOnClick ? blurOnClick : ()=>{}}></div>
    <div className={`absolute ${backgroundColor} z-20 rounded-lg drop-shadow-2xl flex flex-col gap-5 p-10 items-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll`}>
      {children}
    </div>
  </>);
}

Modal.propTypes = {
  message: PropTypes.string,
  setModal: PropTypes.func,
};

import React from 'react';
import {useNavigate} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <div className='absolute w-12 h-12 left-2 top-2'>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        <FontAwesomeIcon className = 'mx-auto mx-3 my-3 fa-xl' icon={faArrowLeft} />      </button>
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
export default function Alert({content, bad}) {
  return (
    <>
      { bad ?
          <div className="bg-red text-white text-center absolute pt-2 top-0 h-10 w-full z-50">{content}</div>:
          <div className="bg-green text-white text-center absolute pt-2 top-0 h-10 w-full z-50">{content}</div>
      }
    </>

  );
};

Alert.propTypes = {
  content: PropTypes.string.isRequired,
  bad: PropTypes.bool,
};

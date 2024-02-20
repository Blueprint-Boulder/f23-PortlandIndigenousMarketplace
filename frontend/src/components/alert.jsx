import React from 'react';
import PropTypes from 'prop-types';
export default function Alert({content, bad}) {
  return (
    <>
      { bad ?
          <div className="bg-red text-white text-center">{content}</div>:
          <div className="bg-green text-white text-center">{content}</div>
      }
    </>

  );
};

Alert.propTypes = {
  content: PropTypes.string.isRequired,
  bad: PropTypes.bool,
};

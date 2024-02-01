import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const MessageContext = createContext();

export const MessageProvider = ({children}) => {
  const [message, setMessage] = useState('');
  const [bad, setBad] = useState(false);
  return (
    <MessageContext.Provider value={{message, setMessage, bad, setBad}}>
      {children}
    </MessageContext.Provider>

  );
};

export const Alert = ({content, bad}) => {
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

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import React, {createContext, useState} from 'react';
import PropTypes from 'prop-types';
import useUser from './useUser';

export const Context = createContext();


export const Provider = ({children}) => {
  const [message, setMessage] = useState('');
  const [bad, setBad] = useState(false);
  const {user, setUser, destroyUser} = useUser();


  return (
    <Context.Provider value={{message, setMessage, bad, setBad, user, setUser, destroyUser}}>
      {children}
    </Context.Provider>

  );
};


Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

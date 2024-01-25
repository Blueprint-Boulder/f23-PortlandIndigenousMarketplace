import React, {useEffect} from 'react';
import PropTypes from 'prop-types'; // Add the missing import

import {Outlet, useLocation} from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/headervendor';
import {Alert, MessageContext} from '../alert.jsx';
import {useContext} from 'react';
import axios from 'axios';


export default function Root({admin}) {
  // const data = useLoaderData()
  const {message, setMessage, bad, setBad} = useContext(MessageContext);
  setTimeout(() => {
    setMessage(''); setBad(false);
  }, 5000);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const server = axios.create({
      baseURL: 'http://localhost:3001',
      withCredentials: false,
    });
    server.get('/').then((res) => console.log('response from backend', res.data)).catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-grey-1 w-screen flex h-screen flex-col">
      {message && <Alert content = {message} bad ={bad}/>}
      <Header admin={admin}/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

Root.propTypes = {
  admin: PropTypes.bool.isRequired,
};

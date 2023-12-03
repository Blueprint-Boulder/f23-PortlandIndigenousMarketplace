import React from 'react';
import PropTypes from 'prop-types'; // Add the missing import

import {Outlet, useLocation} from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/headervendor';
import {Alert, MessageContext} from '../alert.jsx';
import {useContext} from 'react';


export default function Root({admin}) {
  // const data = useLoaderData()
  const {message, setMessage, bad} = useContext(MessageContext);
  setTimeout(() => setMessage(''), 5000);
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="bg-slate-200 w-screen h-screen">
      {message && <Alert content = {message} bad ={bad}/>}
      <div id="content" >
        <Header admin={admin}/>
        <Outlet/>
        <Footer/>
      </div>
    </div>
  );
}

Root.propTypes = {
  admin: PropTypes.bool.isRequired,
};

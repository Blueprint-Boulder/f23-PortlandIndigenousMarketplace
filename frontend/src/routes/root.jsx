import React from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/headervendor';
import PropTypes from 'prop-types'; // Add the missing import

// Your code here


export default function Root({admin}) {
  // const data = useLoaderData()
  return (
    <div className="bg-slate-200 w-screen h-screen">
      <div id="content">
        <Header admin={admin} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

Root.propTypes = {
  admin: PropTypes.bool.isRequired,
};

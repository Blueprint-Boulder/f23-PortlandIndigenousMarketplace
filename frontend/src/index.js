import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Events from './routes/events';
import Profile from './routes/profile';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ServiceExample from './routes/serviceexample';
import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
// import axios from 'axios';
import Register from './routes/register';
import ResetPassword from './routes/reset_password';
import MockVendorService from './services/MockServices/MockVendorService.js';

import config from './config.js';

const isadmin = true;

// if(!session){
//    path  = '/login'
//   el = <Login/>
// }else{
//   path = '/vendor'
//   el = <Vendor/>
// }
// function loaderfunc(){
//   axios.get("localhost:3001").then((res) => console.log(res) ).catch(err =>  console.log('there was an error:', err))
// }

// Setup the mock vendor service
if (config.environment === 'dev') {
  MockVendorService.init();
}

const router = createBrowserRouter([
  {
    path: '/',
    // loader: loaderfunc(),
    element: <Root admin = {isadmin}/>,
    children: [
      {
        path: '/vendor',
        element: <Vendor />,
      },
      {
        path: '/login',
        element: <Login/>,
      },
      {
        path: '/register',
        element: <Register/>,
      },
      {
        path: '/reset_password',
        element: <ResetPassword/>,
      },
      {
        path: '/profile',
        element: <Profile/>,
      },
      {
        path: '/events',
        element: <Events/>,
      },
      config.environment === 'dev' && {
        path: '/service-example',
        element: <ServiceExample VendorService={MockVendorService}/>,
      }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
export default Root = root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);

import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Event from './routes/event.jsx';
import Profile from './routes/profile';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Vendors from './routes/vendors.jsx';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
// import axios from 'axios';
import Register from './routes/register';
import ResetPassword from './routes/reset_password';
import MockVendorService from './services/MockServices/MockVendorService.js';
// import MockLoginService from './services/MockServices/MockLoginService';
import MockEventService from './services/MockServices/MockEventService.js';
import handleRegister from './services/handleRegister.js';
import {handleLoginVendor} from './services/handleLogin.js';


import config from './config.js';
import {MessageProvider} from './alert.jsx';

const isadmin = true;
const session = true;


// Setup the mock vendor service
if (config.environment === 'dev') {
  MockVendorService.init();
  MockEventService.init();
}

const router = createBrowserRouter([
  {
    path: '/',
    // loader: loaderfunc(),
    element: <Root admin = {isadmin}/>,
    children: [
      {
        path: '/vendors/:vendorId',
        element: session? <Vendor vendorService={MockVendorService}/> : <Navigate to="/login" />,
      },
      {
        path: '/login',
        element: <Login loginService = {handleLoginVendor} admin={isadmin}/>,
      },
      {
        path: '/register',
        element: <Register registerService = {handleRegister}/>,
      },
      {
        path: '/reset_password',
        element: <ResetPassword/>,
      },
      {
        path: '/profile',
        element: session ? <Profile/> : <Navigate to="/login" />,
      },
      {
        path: '/events/:eventId',
        element: session ? <Event EventService = {MockEventService} /> : <Navigate to="/login" />,
      },
      {
        path: '/vendors',
        element: session && isadmin? <Vendors VendorService={MockVendorService}/>: <Navigate to="/login" />,
      }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
export default root.render(
    <React.StrictMode>
      <MessageProvider>
        <RouterProvider router={router} />
      </MessageProvider>
    </React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);


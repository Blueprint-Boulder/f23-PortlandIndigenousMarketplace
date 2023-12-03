import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Events from './routes/events.jsx';
import Profile from './routes/profile';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import ServiceExample from './routes/serviceexample';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
// import axios from 'axios';
import Register from './routes/register';
import ResetPassword from './routes/reset_password';
import MockVendorService from './services/MockServices/MockVendorService.js';
import MockLoginService from './services/MockServices/MockLoginService';


import config from './config.js';
import {MessageProvider} from './alert.jsx';

const isadmin = true;
const session = true;


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
        element: session? <Vendor /> : <Navigate to="/login" />,
      },
      {
        path: '/login',
        element: <Login loginService = {MockLoginService.login} admin={isadmin}/>,
      },
      {
        path: '/register',
        element: <Register registerService = {MockLoginService.register}/>,
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
        path: '/events',
        element: session ? <Events/> : <Navigate to="/login" />,
      },
      config.environment === 'dev' && {
        path: '/service-example',
        element: session? <ServiceExample VendorService={MockVendorService}/>: <Navigate to="/login" />,
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

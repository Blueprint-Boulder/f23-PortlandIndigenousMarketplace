import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Event from './routes/event.jsx';
import Events from './routes/events.jsx';
import Profile from './routes/profile';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Vendors from './routes/vendors.jsx';
import ErrorPage from './components/error.jsx';
import './App.css';
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Register from './routes/register';
import MockEventService from './services/MockServices/MockEventService.js';
import MockVendorService from './services/MockServices/MockVendorService.js';
import ResetPassword from './routes/reset_password';
import {handleLoginVendor} from './services/handleLogin.js';
import {handleRegister} from './services/handleRegister.js';
import config from './config.js';
import {MessageProvider} from './context.jsx';

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
        element: session? <Vendor VendorService={MockVendorService}/> : <Navigate to="/login" />,
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
        element: session ? <Profile VendorService={MockVendorService}/> : <Navigate to="/login" />,
      },
      {
        path: '/events/:eventId',
        element: session ? <Event EventService = {MockEventService} /> : <Navigate to="/login" />,
      },
      {
        path: '/events',
        element: session ? <Events EventService={MockEventService}/> : <Navigate to="/login" />,
      },
      {
        path: '/vendors',
        element: session && isadmin? <Vendors VendorService={MockVendorService}/>: <Navigate to="/login" />,
      }],
    errorElement: <ErrorPage admin = {isadmin} />,
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


import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals.js';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// Import CSS for this page
import './App.css';

// Import Pages
import Vendor from './routes/vendor.jsx';
import Event from './routes/event.jsx';
import Events from './routes/events.jsx';
import Profile from './routes/profile.jsx';
import Root from './routes/root.jsx';
import Vendors from './routes/vendors.jsx';

import Login from './routes/login.jsx';
import Logout from './routes/logout.jsx';
import Register from './routes/register';
import ResetPassword from './routes/reset_password';

import ErrorPage from './components/error.jsx';

// Import Mock Services
import MockEventService from './services/MockServices/MockEventService.js';
import MockVendorService from './services/MockServices/MockVendorService.js';

// Import Real Services
import EventsService from './services/Events/EventsService.js';
import VendorsService from './services/Vendors/VendorsService.js';

import {handleLoginVendor} from './services/handleLogin.js';
import {handleRegister} from './services/handleRegister.js';

// Import configuration variables
import config from './config.js';

let eventService;
let vendorService;

if (config.environment == 'dev') {
  MockVendorService.init();
  MockEventService.init();

  eventService = MockEventService;
  vendorService = MockVendorService;
} else if (config.environment == 'prod') {
  // Load base url for the backend
  const baseUrl = config.baseUrl;

  // Initilize Services
  const eventsService = new EventsService(baseUrl);
  const vendorsService = new VendorsService(baseUrl);

  eventService = eventsService;
  vendorService = vendorsService;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/vendors/:vendorId',
        element: <Vendor VendorService={MockVendorService} />,
      },
      {
        path: '/login',
        element: <Login loginService={handleLoginVendor} />,

      },
      {
        path: '/register',
        element: <Register registerService={handleRegister} />,
      },
      {
        path: '/reset_password',
        element: <ResetPassword />,
      },
      {
        path: '/profile',
        element: <Profile VendorService={MockVendorService} />,
      },
      {
        path: '/events/:eventId',
        element: <Event eventService={eventService} />,
      },
      {
        path: '/events',
        element: <Events eventService={eventService} />,
      },
      {
        path: '/vendors',
        element: <Vendors vendorService={vendorService} />,
      },
      {
        path: '/logout',
        element: <Logout />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
export default root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);



import React from 'react';
import Login from './routes/login.jsx';
import Vendor from './routes/vendor.jsx';
import Event from './routes/event.jsx';
import Events from './routes/events.jsx';
import Profile from './routes/profile.jsx';
import Root from './routes/root.jsx';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals.js';
import Vendors from './routes/vendors.jsx';
import ErrorPage from './components/error.jsx';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './routes/register.jsx';
import MockEventService from './services/MockServices/MockEventService.js';
import MockVendorService from './services/MockServices/MockVendorService.js';
import ResetPassword from './routes/reset_password.jsx';
import { handleLoginVendor } from './services/handleLogin.js';
import { handleRegister } from './services/handleRegister.js';
import config from './config.js';
import Logout from './routes/logout.jsx';
import EventsService from './services/Events/EventsService.js';


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

  eventService = eventsService;
  vendorService = vendorService;
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
        element: <Event EventService={eventService} />,
      },
      {
        path: '/events',
        element: <Events EventService={eventService} />,
      },
      {
        path: '/vendors',
        element: <Vendors VendorService={vendorService} />,
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



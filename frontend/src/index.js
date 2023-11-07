import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Events from './routes/events';
import Profile from './routes/profile';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./App.css";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
let isAdmin = false; 
// const session = false
// let path
// let el
// if (!session) {
//   path = '/login'
//   el = <Login />
// } else {
//   path = '/vendor'
//   el = <Vendor />
// }
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root admin = {isAdmin}/>,
    children: [
      {
        path: "/vendor",
        element: <Vendor/>
      },
      {
        path: "/events",
        element: <Events />
      },
      {
        path: "/profile",
        element: <Profile />
      }]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

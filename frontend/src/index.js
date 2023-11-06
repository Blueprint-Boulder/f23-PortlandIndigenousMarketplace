import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import "./App.css";
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import axios from 'axios';
import Register from './routes/register';
import ResetPassword from './routes/reset_password';
let isadmin = true

// if(!session){
//    path  = '/login'
//   el = <Login/>
// }else{
//   path = '/vendor'
//   el = <Vendor/>
// }
function loaderfunc(){
  axios.get("/").then((res) => console.log(res) ).catch(err =>  console.log('there was an error:', err))
}
const router = createBrowserRouter([
  {
    path: "/",
    loader: loaderfunc(),
    element: <Root admin = {isadmin}/>,
    children:[ 
    {
        path: "/vendor",
        element: <Vendor />
    },
    {
      path: '/login',
      element: <Login/> 
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/reset_password',
      element: <ResetPassword/>
    }]
  },
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

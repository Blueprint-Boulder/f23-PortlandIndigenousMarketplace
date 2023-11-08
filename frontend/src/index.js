import React from 'react';
import Login from './routes/login';
import Vendor from './routes/vendor';
import Root from './routes/root';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const session = false
let path
let el
if (!session) {
  path = '/login'
  el = <Login />
} else {
  path = '/vendor'
  el = <Vendor />
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root path={path} />,
    children: [
      {
        path: path,
        element: el
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

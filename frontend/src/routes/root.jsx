import React from 'react';

import {Outlet, useLocation} from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/headervendor';
import Alert from '../components/alert.jsx';
import {Context} from '../services/context.jsx';
import {useContext} from 'react';


export default function Root() {
  const {message, setMessage, bad, setBad} = useContext(Context);
  setTimeout(() => {
    setMessage(''); setBad(false);
  }, 5000);
  const location = useLocation();
  console.log(location.pathname);

  return (
    <div className="bg-grey-1 w-screen flex min-h-screen flex-col">
      {message && <Alert content = {message} bad ={bad}/>}
      <Header />
      <Outlet/>
      <Footer/>
    </div>
  );
}



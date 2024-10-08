import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/footer.jsx';
// import Header from '../components/headervendor';
import Alert from '../components/alert.jsx';
import {Context} from '../services/context.jsx';
import Cookies from 'js-cookie';
import User from '../objects/User';
import BackButton from '../components/backbutton.jsx';

export default function Root() {
  const [message, setMessage] = useState('');
  const [bad, setBad] = useState(false);
  const [user, setUser] = useState(false);
  const [cookie, setCookie] = useState(null);
  setTimeout(() => {
    setMessage(''); setBad(false);
  }, 5000);

  useEffect(() => {
    const checkCookie = () => {
      const currentCookie = Cookies.get('auth') || Cookies.get('auth_pim');
      if (currentCookie !== cookie && currentCookie !== undefined) {
        setCookie(currentCookie);
        setUser(User.newUserFromCookie(currentCookie));
        console.log(User.newUserFromCookie(currentCookie));
      }
    };

    // Check immediately
    checkCookie();

    // Then check every second
    const intervalId = setInterval(checkCookie, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [cookie]);

  return (
    <Context.Provider value = {{message, setMessage, bad, setBad, user, setUser}}>
      <div className="w-screen flex flex-col min-h-screen pt-10 bg-snow">
        {message && <Alert content = {message} bad ={bad}/>}
        <BackButton/>
        <Outlet/>
        <Footer/>
      </div>
    </Context.Provider>

  );
}



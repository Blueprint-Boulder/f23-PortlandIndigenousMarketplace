import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/headervendor';
import Alert from '../components/alert.jsx';
import {Context} from '../services/context.jsx';
import Cookies from 'js-cookie';
import User from '../objects/User';

export default function Root() {
  const [message, setMessage] = useState('');
  const [bad, setBad] = useState(false);
  const [user, setUser] = useState(null);
  const [cookie, setCookie] = useState(Cookies.get('auth') || Cookies.get('auth_pim'));
  setTimeout(() => {
    setMessage(''); setBad(false);
  }, 5000);

  useEffect(() => {
    // Update the user state when the cookie changes
    if (Cookies.get('auth') || Cookies.get('auth_pim')) {
      setUser(User.newUserFromCookie(cookie));
    }
  }, [cookie]);

  useEffect(() => {
    // Set up a mutation observer to watch for changes in the cookie
    const observer = new MutationObserver(() => {
      setCookie(Cookies.get('auth') || Cookies.get('auth_pim'));
    });

    // Start observing the document with the configured parameters
    observer.observe(document, {attributes: true, attributeFilter: ['cookie'], subtree: true});

    // Clean up the observer when the component unmounts
    return () => observer.disconnect();
  }, []);
  return (
    <Context.Provider value = {{message, setMessage, bad, setBad, user, setUser}}>
      <div className="bg-grey-1 w-screen flex min-h-screen flex-col">
        {message && <Alert content = {message} bad ={bad}/>}
        <Header />
        <Outlet/>
        <Footer/>
      </div>
    </Context.Provider>

  );
}



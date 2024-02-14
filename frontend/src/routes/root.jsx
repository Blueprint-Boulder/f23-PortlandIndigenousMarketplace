import React, {useState} from 'react';
import {Outlet} from 'react-router-dom';
import Footer from '../components/footer.jsx';
import Header from '../components/headervendor';
import Alert from '../components/alert.jsx';
import {Context} from '../services/context.jsx';


export default function Root() {
  const [message, setMessage] = useState('');
  const [bad, setBad] = useState(false);
  const [user, setUser] = useState(false);
  setTimeout(() => {
    setMessage(''); setBad(false);
  }, 5000);

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



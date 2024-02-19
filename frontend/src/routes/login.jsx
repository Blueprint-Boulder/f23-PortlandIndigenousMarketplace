
import React, {useState} from 'react';
import logo from './../assets/PIM_logo_black.png';
import {Link, useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {Context} from '../services/context';
import PropTypes from 'prop-types';


export default function Login({loginService}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const {setMessage, setBad, setUser} = useContext(Context);

  async function handleLogin() {
    const data = {email: email, password: pass};
    if (await loginService(data)) {
      setBad(false);
      setUser({email: email, password: pass, id: 2, isadmin: true}); // dummy user object for develepment
      setMessage('Logged in succesfully');
      navigate('/events');
      console.log('Logged in!');
    } else {
      setBad(true);
      setMessage('Failed to login');
    }
  }

  return (
    <div className="content-center my-auto overflow-scroll">

      <div className="flex flex-col m-auto w-max px-4 text-center justify-start ">

        <img className="max-w-xs" src={logo} alt="Pim logo white" />

        <div className="m-2">
          Login
        </div>

        <div className="m-2">
          <input
            className="p-1 rounded-lg w-3/4 drop-shadow-md"
            placeholder="Username"
            onChange={(e) => setEmail(e.target.value)}>
          </input>
        </div>
        <div className="m-2">
          <input
            className="p-1 rounded-lg w-3/4 drop-shadow-md"
            placeholder="Password" type="password"
            onChange={(e) => setPass(e.target.value)}>
          </input>
        </div>

        <div className="m-2 ">
          <button
            className="p-1 bg-blue w-3/4 rounded click:bg-black drop-shadow-md"
            onClick={() => handleLogin()}>
            Submit
          </button>
        </div>

        <div className="m-2 text-blue underline">
          <Link to='/reset_password'>Forgot Password?</Link>
        </div>

        <div className="m-2 text-blue underline">
          <Link to='/register'>Don&apos;t have an account? Register</Link>
        </div>
      </div>

    </div>
  );
}

Login.propTypes = {
  loginService: PropTypes.func.isRequired,
};

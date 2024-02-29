import React, {useState} from 'react';
import logo from './../assets/PIM_logo_black.png';
import {Link, useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {Context} from '../services/context';
import PropTypes from 'prop-types';

export default function Login({vendorService}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const {setMessage, setBad, setUser} = useContext(Context);

  async function handleLogin() {
    const data = {email: email, password: pass};
    const loginResponse = await vendorService.authenticateVendor(data);

    if (loginResponse != undefined) {
      if (loginResponse.status == 200) {
        setUser(vendorService.httpClient.user);
        setBad(false);
        setMessage('Logged in succesfully');
        navigate('/events');
        console.log('Logged in as user: ', vendorService.httpClient.user);
      } else if (loginResponse.status == 401) {
        setBad(true);
        setMessage('Bad Request. Check username and password.');
      } else if (loginResponse.status == 500) {
        setBad(true);
        setMessage('Server experienced an error processing this request. Please try again.');
      }
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
            placeholder="Email"
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
  vendorService: PropTypes.shape( {
    authenticateVendor: PropTypes.func.isRequired,
    httpClient: PropTypes.shape( {
      user: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

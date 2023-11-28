
import React, {useState} from 'react';
import logo from './../assets/PIM_logo_black.png';
import {Link, useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {MessageContext} from '../alert';
import PropTypes from 'prop-types';


export default function Login({loginService, admin}) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const {setMessage, setBad} = useContext(MessageContext);


  async function handleLogin() {
    const data = {username: user, password: pass};
    if (loginService(data)) {
      setMessage('Logged in succesfully');
            admin ? navigate('/events') : navigate('/vendor');
            console.log('Logged in!');
    } else {
      setMessage('Failed to login');
      setBad(true);
    }
    // axios.post("/login", data).then(() => redirect('/events')).catch(err => setMessage('There was an error: ' + err), setErr(true))
  }

  return (
    <div className="content-centerh-[80vh] overflow-scroll">

      <div className="flex flex-col m-auto w-max px-4 text-center justify-start ">

        <img className="max-w-xs" src={logo} alt="Pim logo white" />

        <div className="m-2">
                    Login
        </div>

        <div className="m-2">
          <input
            className="rounded-lg w-3/4"
            placeholder="Username"
            onChange={(e) => setUser(e.target.value)}>
          </input>
        </div>
        <div className="m-2">
          <input
            className="rounded-lg w-3/4"
            placeholder="Password" type="password"
            onChange={(e) => setPass(e.target.value)}>
          </input>
        </div>

        <div className="m-2 ">
          <button
            className="bg-blue-300 w-3/4 rounded click:bg-blue-600"
            onClick={() => handleLogin()}>
                Submit
          </button>
        </div>

        <div className="m-2 text-blue-400 underline">
          <Link to='/reset_password'>Forgot Password?</Link>
        </div>

        <div className="m-2 text-blue-400 underline">
          <Link to='/register'>Don&apos;t have an account? Register</Link>
        </div>
      </div>

    </div>
  );
}

Login.propTypes = {
  loginService: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
};

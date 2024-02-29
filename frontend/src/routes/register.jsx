import React from 'react';
import {useState} from 'react';
import logo from './../assets/PIM_logo_black.png';
import {Link, useNavigate} from 'react-router-dom';
import {Context} from '../services/context';
import Alert from '../components/alert.jsx';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Vendor from '../objects/Vendor.js';
import FooterPad from '../components/footerpad.jsx';


export default function Register({vendorService, adminService}) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [website, setWebsite] = useState();
  const {setMessage, setBad} = useContext(Context);
  const navigate = useNavigate();

  async function handleRegister() {
    const vendor = new Vendor(name, email, website, phone);

    const response = await vendorService.createVendor(vendor, pass);
    console.log(response);
    if (response) {
      setBad(false);
      setMessage('Registered succesfully');
      console.log('Registered!');
      navigate('/login');
    } else {
      setBad(true);
      setMessage('Failed to register');
    }
  };

  async function handleRegisterAdmin() {
    const response = await adminService.createAdmin(
        {
          name: name,
          password: pass,
          email: email,
        } );
    console.log(response);
    if (response) {
      setBad(false);
      setMessage('Registered succesfully');
      console.log('Registered!');
      navigate('/login');
    } else {
      setBad(true);
      setMessage('Failed to register');
    }
  };

  return (
    <div className="content-center my-auto overflow-scroll">


      <div className="flex flex-col m-auto w-max px-4 text-center justify-start">

        <img className="max-w-xs" src={logo} alt="Pim logo white" />

        <div className="m-2">
                    Register
        </div>
        <div className="m-2">
          <input className="p-1 rounded-lg w-3/4" placeholder="Name" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className="m-2">
          <input className="p-1 rounded-lg w-3/4" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div className="m-2">
          <input className="p-1 rounded-lg w-3/4" placeholder="Website" onChange={(e) => setWebsite(e.target.value)}></input>
        </div>
        <div className="m-2">
          <input className="p-1 rounded-lg w-3/4" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)}></input>
        </div>
        <div className="m-2">
          <input className="p-1 rounded-lg w-3/4" placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)}></input>
        </div>

        <div className="m-2">
          <input className="p-1 rounded-lg w-3/4" placeholder="Re-enter password" type="password" onChange={(e) => setPass2(e.target.value)}></input>
        </div>

        {pass !== pass2 && <Alert content="Passwords match" bad ={true}/>}

        <div className="m-2 ">
          <button className="bg-blue w-3/4 rounded click:bg-black" onClick={() => handleRegister()}>Register</button>
          <button className="bg-grey-3 w-3/4 rounded click:bg-black" onClick={() => handleRegisterAdmin()}>Register Admin (is this allowed?)</button>
        </div>

        <div className="m-2 text-blue underline">
          <Link to='/login'>Back to login</Link>
        </div>
      </div>
      <FooterPad />
    </div>
  );
}

Register.propTypes = {
  vendorService: PropTypes.shape({
    createVendor: PropTypes.func.isRequired,
  }).isRequired,
  adminService: PropTypes.shape({
    createAdmin: PropTypes.func.isRequired,
  }).isRequired,
};

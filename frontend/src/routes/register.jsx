import React from 'react';
import {useState} from 'react';
import logo from './../assets/PIM_logo_black.png';
import {Link, useNavigate} from 'react-router-dom';
import {Context} from '../services/context';
import Alert from '../components/alert.jsx';
import {useContext} from 'react';
import PropTypes from 'prop-types';
// import Vendor from '../objects/Vendor.js';
import FooterPad from '../components/footerpad.jsx';


export default function Register({vendorService, adminService}) {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [website, setWebsite] = useState();
  const {setMessage, setBad} = useContext(Context);
  const [validEmail, setValidEmail] = useState(true);
  const [validWebsite, setValidWebsite] = useState(true);
  const [badLocal, setBadLocal] = useState(false);
  const [validPhone, setValidPhone] = useState(true);
  const navigate = useNavigate();

  async function handleRegister() {
    const vendor = {name: name, email: email, website: website, phoneNumber: phone, image: ''};

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

  // async function handleRegisterAdmin() {
  //   const response = await adminService.createAdmin(
  //       {
  //         name: name,
  //         password: pass,
  //         email: email,
  //       } );
  //   console.log(response);
  //   if (response) {
  //     setBad(false);
  //     setMessage('Registered succesfully');
  //     console.log('Registered!');
  //     navigate('/login');
  //   } else {
  //     setBad(true);
  //     setMessage('Failed to register');
  //   }
  // };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/;
    if (email === '') {
      setValidEmail(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(email)) {
      // The email input matches the pattern
      setEmail(email);
      setBadLocal(false);
      setValidEmail(true);
    } else {
      // The website input does not match the pattern
      setValidEmail(false);
      setBadLocal(true);
    }
  };

  const handleWebsiteChange = (e) => {
    const website = e.target.value;
    const pattern = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    if (website === '') {
      setValidWebsite(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(website)) {
      // The website input matches the pattern
      setWebsite(website);
      setBadLocal(false);
      setValidWebsite(true);
    } else {
      // The website input does not match the pattern
      setValidWebsite(false);
      setBadLocal(true);
    }
  };

  const handlePhoneChange = (e) => {
    const phone = e.target.value;
    const pattern = /^\d{10}$/;

    if (phone === '') {
      setValidPhone(true);
      setBadLocal(false);
      return;
    }
    if (pattern.test(phone)) {
      setValidPhone(true);
      setPhone(phone);
      setBadLocal(false);
    } else {
      setValidPhone(false);
      setBadLocal(true);
    }
  };

  return (
    <div className="content-center my-auto overflow-scroll">


      <div className="flex flex-col m-auto w-max px-4 text-center justify-start">

        <img className="max-w-xs" src={logo} alt="Pim logo white" />

        <div className="m-2">
                    Register
        </div>
        <form method= '' onSubmit={(e) => {
          if (badLocal || pass !== pass2) {
            e.preventDefault();
            return;
          }
          e.preventDefault();
          handleRegister();
        }}>
          <div className="m-2">
            <input
              className="p-1 rounded-lg w-3/4"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}></input>
          </div>
          {!validEmail && <Alert content="Must be a valid email" bad ={true}/>}
          <div className="m-2">
            <input
              className="p-1 rounded-lg w-3/4"
              required
              placeholder="Email"
              onChange={(e) => handleEmailChange(e)}></input>
          </div>
          {!validWebsite && <Alert content="Must be a valid website" bad ={true}/>}
          <div className="m-2">
            <input
              className="p-1 rounded-lg w-3/4"
              placeholder="Website"
              onChange={(e) => {
                handleWebsiteChange(e);
              }}></input>
          </div>
          {!validPhone && <Alert content="Must be a valid phone number" bad ={true}/>}
          <div className="m-2">
            <input
              className="p-1 rounded-lg w-3/4"
              placeholder="Phone Number"
              onChange={(e) => handlePhoneChange(e)}></input>
          </div>
          <div className="m-2">
            <input
              className="p-1 rounded-lg w-3/4"
              placeholder="Password"
              required
              type="password"
              onChange={(e) => setPass(e.target.value)}></input>
          </div>

          <div className="m-2">
            <input
              className="p-1 rounded-lg w-3/4"
              placeholder="Re-enter password"
              required
              type="password"
              onChange={(e) => setPass2(e.target.value)}></input>
          </div>

          {pass !== pass2 && <Alert content="Passwords match" bad ={true}/>}
          <div className="m-2 ">
            <button className={`${badLocal || pass !== pass2 ? 'bg-grey-2': 'bg-blue'} w-3/4 rounded click:bg-black`} type='submit'>Register</button>
          </div>
        </form>

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

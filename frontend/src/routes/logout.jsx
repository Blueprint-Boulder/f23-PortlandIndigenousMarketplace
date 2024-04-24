
import React, {useContext, useState} from 'react';
import {Context} from '../services/context.jsx';
import {useNavigate} from 'react-router-dom';
import FooterPad from '../components/footerpad.jsx';
import PropTypes from 'prop-types';
import bLogo from '../assets/PIM_logo_black.png';

function LogoutModal({handleLogout, closeModal}) {
  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/* content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/* header*/}
          <div className="flex items-start justify-between p-3 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-xl font-semibold">Logout Confirmation</h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={closeModal}
            >
              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          {/* body*/}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              Are you sure you want to logout?
            </p>
          </div>
          {/* footer*/}
          <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={closeModal}>
              No
            </button>
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={handleLogout}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Logout({vendorService, adminService}) {
  const {setUser, user, setMessage} = useContext(Context);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    if (user.isadmin) {
      adminService.httpClient.destroyUser();
    } else {
      vendorService.httpClient.destroyUser();
    }
    setUser();
    setMessage('Logged out');
    navigate('/');
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Logout Page</title>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              text-align: center;
              padding-top: 50px;
            }
            .logout-message {
              font-size: 24px;
              margin-bottom: 20px;
            }
            .logout-button {
              padding: 10px 20px;
              background-color: black;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none;
              transition: background-color 0.3s ease;
            }
            .logo {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .center {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            }
          `}
        </style>
      </head>
      <body>
        <img src={bLogo} alt="Event Logo" className="logo" />
        <div className="logout-message">Hate to see you go! See you next time!</div>
        <div className="center">
          <div className="logout-button" onClick={openModal}>
            Logout
          </div>
          {showModal && <LogoutModal handleLogout={handleLogout} closeModal={closeModal} />}
          <FooterPad />
        </div>
      </body>
    </html>
  );
}

Logout.propTypes = {
  vendorService: PropTypes.object,
  adminService: PropTypes.object,
};

LogoutModal.propTypes = {
  handleLogout: PropTypes.func,
  closeModal: PropTypes.func,
};



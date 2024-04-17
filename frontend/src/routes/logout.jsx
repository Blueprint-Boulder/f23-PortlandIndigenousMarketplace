
import React, { useContext, useState } from 'react';
import { Context } from '../services/context.jsx';
import { useNavigate } from 'react-router-dom';
import FooterPad from '../components/footerpad.jsx';
import PropTypes from 'prop-types';
import bLogo from '../assets/PIM_logo_black.png';

function LogoutModal({ handleLogout, closeModal }) {
  return (
    <div className="modal d-inline-flex align-items-center justify-content-center" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Logout Confirmation</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to logout?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleLogout}>
              Yes
            </button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function Logout({ vendorService, adminService }) {
  const { setUser, user, setMessage } = useContext(Context);
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
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
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
              background-color: #007bff;
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
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </body>
    </html>
  );
}

Logout.propTypes = {
  vendorService: PropTypes.object,
  adminService: PropTypes.object,
};

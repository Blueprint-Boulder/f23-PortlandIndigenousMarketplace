import React, {useContext} from 'react';
import {Context} from '../services/context.jsx';
import {useNavigate} from 'react-router-dom';
import FooterPad from '../components/footerpad.jsx';
import PropTypes from 'prop-types';

export default function Logout({vendorService, adminService}) {
  const {setUser, user, setMessage} = useContext(Context);
  const navigate = useNavigate();
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
  return (
    <div className="center">
      <div className="p-1 rouned-lg bg-white shadow-md" onClick={handleLogout}>Logout</div>
      <FooterPad />
    </div>

  );
}

Logout.propTypes = {
  vendorService: PropTypes.object,
  adminService: PropTypes.object,
};

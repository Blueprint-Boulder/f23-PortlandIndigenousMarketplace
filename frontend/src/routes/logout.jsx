import React from 'react';
import useUser from '../services/useUser';
import {useNavigate} from 'react-router-dom';
export default function Logout() {
  const {destroyUser} = useUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    destroyUser();
    navigate('/');
  };
  return (
    <div className="center">
      <div className="p-1 rouned-lg bg-white shadow-md" onClick={handleLogout}>Logout</div>
    </div>
  );
}

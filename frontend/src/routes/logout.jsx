import React, {useContext} from 'react';
import {Context} from '../services/context.jsx';
import {useNavigate} from 'react-router-dom';
export default function Logout() {
  const {setUser} = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser();
    navigate('/');
  };
  return (
    <div className="center">
      <div className="p-1 rouned-lg bg-white shadow-md" onClick={handleLogout}>Logout</div>
    </div>
  );
}

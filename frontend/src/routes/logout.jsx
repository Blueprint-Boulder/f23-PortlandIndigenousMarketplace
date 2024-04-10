// import React, {useContext} from 'react';
// import {Context} from '../services/context.jsx';
// import {useNavigate} from 'react-router-dom';
// import FooterPad from '../components/footerpad.jsx';
// import PropTypes from 'prop-types';

// export default function Logout({vendorService, adminService}) {
//   const {setUser, user, setMessage} = useContext(Context);
//   const navigate = useNavigate();
//   const handleLogout = () => {
//     if (user.isadmin) {
//       adminService.httpClient.destroyUser();
//     } else {
//       vendorService.httpClient.destroyUser();
//     }
//     setUser();
//     setMessage('Logged out');
//     navigate('/');
//   };
//   return (
//     <div className="center">
//       <div className="p-1 rouned-lg bg-white shadow-md" onClick={handleLogout}>Logout</div>
//       <FooterPad />
//     </div>

//   );
// }

// Logout.propTypes = {
//   vendorService: PropTypes.object,
//   adminService: PropTypes.object,
// };
import React, { useContext } from 'react';
import { Context } from '../services/context.jsx';
import { useNavigate } from 'react-router-dom';
import FooterPad from '../components/footerpad.jsx';
import PropTypes from 'prop-types';

export default function Logout({ vendorService, adminService }) {
  const { setUser, user, setMessage } = useContext(Context);
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
            .login-button {
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              text-decoration: none;
              transition: background-color 0.3s ease;
            }
            .login-button:hover {
              background-color: #0056b3;
            }
          `}
        </style>
      </head>
      <body>
        <div className="logout-message">Logged out successfully. Hate to see you go! See you next time!</div>
        <div className="center">
          <div className="p-1 rounded-lg bg-white shadow-md login-button" onClick={handleLogout}>
            Logout
          </div>
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

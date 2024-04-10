// import React from 'react';
// import '../styles/footer.css';
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
// import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

// export default function Footer() {
//   return (
//     <div className='fixed bottom-0' id="Footer">
//       <div id="Footer-content" className="flex justify-around items-center p-4">
//         <div className="footer-section">
//           {/* <Link to="/"> */}
//             <FontAwesomeIcon icon={faCalendarDays} />
//             <div className="icon-text">
//               <span className="section-text">Events</span>
//             </div>
//           {/* </Link> */}
//         </div>

//         <div className="footer-section">
//           {/* <Link to="/profile"> */}
//             <FontAwesomeIcon icon={faUser} className="fa-icon" />
//             <div className="icon-text">
//               <span className="section-text">Profile</span>
//             </div>
//           {/* </Link> */}
//         </div>

//         <div className="footer-section">
//           {/* <Link to="/home"> */}
//             <FontAwesomeIcon icon={faUserGroup} />
//             <div className="icon-text">
//               <span className="section-text">Vendors</span>
//             </div>
//           {/* </Link> */}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendarDays,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';
import {Context} from '../services/context.jsx';
import '../styles/footer.css';

export default function Footer() {
  const {user} = useContext(Context);

  return (
    <div className="fixed bottom-0 " id="Footer">
      <div id="Footer-content" className="flex justify-around items-center p-4">
        <div className="footer-section">
          <Link to="/events" className="text-blue-500">
            <FontAwesomeIcon icon={faCalendarDays} />
            <div className="icon-text">
              <span className="section-text">Events</span>
            </div>
          </Link>
        </div>

        {user && !user.isadmin ? (
          <div className="footer-section">
            <Link to={`/vendors/${user.id}`} className="text-blue-500">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <div className="icon-text">
                <span className="section-text">Profile</span>
              </div>
            </Link>
          </div>
        ) : null}

        {user && user.isadmin ? (
          <div className="footer-section">
            <Link to="/vendors" className="text-blue-500 ">
              <FontAwesomeIcon icon={faUserGroup} />
              <div className="icon-text">
                <span className="section-text">Vendors</span>
              </div>
            </Link>
          </div>
        ) : null}

        {user ? (
          <div className="footer-section">
            <Link to="/logout" className="text-blue-500">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <div className="icon-text">
                <span className="section-text">Logout</span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="footer-section">
            <Link to="/login" className="text-blue-500">
              <FontAwesomeIcon icon={faUser} className="fa-icon" />
              <div className="icon-text">
                <span className="section-text">Login</span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

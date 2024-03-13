import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {Context} from '../services/context.jsx';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = useContext(Context);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex bg-blue ">
      <div className="flex-wrap p-4 ml-auto">
        <div className="flex md:order-2">
          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex ml-20 p-2 w-10 h-10 text-sm rounded-lg md:hidden lg:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? '' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col md:flex-row lg:flex-row font-lg p-2  mt-4   rounded-lg ">
            <li>
              {user && !user.isadmin &&<Link to={`/vendors/:${user.id}`} className="block py-2 pl-3 pr-4  rounded hover:bg-gray-100 ">Profile</Link>}
            </li>
            <li>
              <Link to='/events' className="block py-2 pl-3 pr-4 text-gray-900 rounded">Events</Link>
            </li>
            <li>
              {user ?
              <Link to = '/logout' className="block py-2 pl-3 pr-4 text-gray-900 rounded ">Logout</Link> :
              <Link to='/login' className="block py-2 pl-3 pr-4 text-gray-900 rounded ">Login</Link>}
            </li>
            {user && user.isadmin && <li><Link to='/vendors' className="block py-2 pl-3 pr-4 text-gray-900 rounded ">Vendors</Link></li> }
          </ul>
        </div>
      </div>
    </div>
  );
}

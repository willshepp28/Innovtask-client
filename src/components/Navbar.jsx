import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';

export default function NavBar() {
    const { isAuthenticated, logout } = useAuthentication();

    return (
        <nav className="navbar navbar-innovtask navbar-expand-lg navbar-light bg-light justify-content-between p-2">
        <Link className="navbar-brand" to="/">
          InnovTask
        </Link>
        <div>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <li className="nav-item">
                <button className="btn bt-bg-blue-green" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    )
}
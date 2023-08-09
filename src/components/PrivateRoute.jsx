// PrivateRoute.js


import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthentication();  // get authentication status from context or any other source

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;  // render children if authenticated, otherwise render nothing
}

export default PrivateRoute;

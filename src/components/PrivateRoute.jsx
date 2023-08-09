import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../contexts/AuthenticationContext';
import { useEffect } from 'react';

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { authenticationToken } = useAuthentication();

  useEffect(() => {
    if (!authenticationToken) {
        navigate('/signup');
      }
  }, [ authenticationToken, navigate])

  if (!authenticationToken) {
    return null; // Render nothing if redirecting
  }

  return children;
}

export default PrivateRoute;

// PrivateRoute.js

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../contexts/AuthenticationContext";

function PrivateRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthentication();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

export default PrivateRoute;

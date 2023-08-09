import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthenticationProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          {/* Add more PrivateRoutes as needed */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </AuthenticationProvider>
  );
}

export default App;

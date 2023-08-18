import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import { AuthenticationProvider } from "./contexts/AuthenticationContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import TaskDetails from "./components/TaskDetails";
import NavBar from "./components/Navbar";

function App() {
  return (
    <AuthenticationProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/task/:id"
            element={
              <PrivateRoute>
                <TaskDetails />
              </PrivateRoute>
            }
          />
          {/* Add more PrivateRoutes as needed */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthenticationProvider>
  );
}

export default App;

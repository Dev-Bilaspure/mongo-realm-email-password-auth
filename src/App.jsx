import axios from "axios";
import { useContext, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";
import Signup from "./pages/Signup";

function App() {
  const { authenticatedUser } = useContext(UserContext);
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          element={authenticatedUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={authenticatedUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          exact
          path="/signup"
          element={authenticatedUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          exact
          path="/requestresetpassword"
          element={<RequestPasswordReset />}
        />
        <Route exact path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { logOutUser } = useContext(UserContext);
  const handleLogoutClick = () => {
    logOutUser();
  };
  return (
    <div>
      This is home page.
      <button onClick={handleLogoutClick}>Logout</button><br />
      <Link to='/requestresetpassword'>Reset Password</Link>
    </div>
  );
};

export default Home;

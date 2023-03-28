import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Home = () => {
  const { logOutUser } = useContext(UserContext);
  const handleLogoutClick = () => {
    logOutUser();
  };
  return (
    <div>
      This is home page.
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
};

export default Home;

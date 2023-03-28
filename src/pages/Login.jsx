/* eslint-disable */

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { emailPasswordLogin } = useContext(UserContext);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleLoginClick() {
    console.log("login btn clicked");
    if (email === "" || password === "" || !validateEmail(email)) return;
    await emailPasswordLogin(email, password);
    setEmail("");
    setPassword("");
    navigate("/");
  }
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ marginBottom: 10 }}>Login page</h3>
        Email:
        <input
          type={"text"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        Password:
        <input
          type={"text"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button onClick={handleLoginClick}>Login</button>
      </div>
      <div>
        Don't have an account? <Link to="/signup">SignUp</Link>
        <br />
        {/* or<br /> */}
        {/* <Link to='/resetmypassword'>Forgot password</Link> */}
      </div>
    </div>
  );
};

export default Login;

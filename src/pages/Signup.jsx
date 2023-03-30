/* eslint-disable */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    emailPasswordLogin,
    emailPasswordSignup,
    logOutUser,
    authenticatedUser,
  } = useContext(UserContext);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async function handleSignUpClick() {
    console.log("signup btn clicked");
    if (email === "" || password === "" || !validateEmail(email)) return;
    await emailPasswordSignup(email, password);
    setEmail("");
    setPassword("");
    navigate("/");
  }
  return (
    <div>
      <div>
        <h3 style={{ marginBottom: 10 }}>Signup page</h3>
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
        <button onClick={handleSignUpClick}>SignUp</button>
      </div>
      <div>
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Signup;

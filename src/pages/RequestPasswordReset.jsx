import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const { requestForPasswordReset } = useContext(UserContext);
  const handleClickRequestPasswordReset = async () => {
    if(newPassword.length<6) {
      console.log('new password should be atleast 6 character long.')
      return;
    }
    console.log("clicked reset password");
    await requestForPasswordReset(email, newPassword);
  };
  return (
    <div>
      Enter your email<br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <br />
      Enter a new password<br />
      <input
        type="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ marginBottom: 5 }}
      />
      <br />
      <button onClick={handleClickRequestPasswordReset}>
        Request password reset
      </button>{" "}
      <br />
      <Link to="/login">Login</Link> <br />
      or <br />
      <Link to="/signup">SignUp</Link>
    </div>
  );
};

export default RequestPasswordReset;

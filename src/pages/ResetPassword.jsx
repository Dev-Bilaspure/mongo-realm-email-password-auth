import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const { resetPassword } = useContext(UserContext);

  const handleResetPasswordClick = async () => {
    if (newPassword.length < 6) return;
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const tokenId = params.get("tokenId");
    await resetPassword(token, tokenId, newPassword);
    setNewPassword("");
    navigate("/login");
  };

  return (
    <div>
      <h3>Reset Password Page</h3>
      <input
        type="text"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <br />
      <button onClick={handleResetPasswordClick}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;

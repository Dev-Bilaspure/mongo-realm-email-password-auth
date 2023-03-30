import { createContext, useEffect, useState } from "react";
import * as Realm from "realm-web";
import { useNavigate } from "react-router-dom";

const app = new Realm.App({ id: process.env.MY_APP_ID });

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  useEffect(() => {
    if (location.pathname === "/confirm-email") {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");
      const tokenId = params.get("tokenId");
      verifyUserEmail(token, tokenId);
      return;
    }
    fetchUser();
  }, []);

  async function emailPasswordLogin(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    console.log(credentials);
    const authedUser = await app.logIn(credentials);
    setAuthenticatedUser(authedUser);
    return authedUser;
  }
  async function emailPasswordSignup(email, password) {
    try {
      const reqData = {
        rootURL: window.location.origin,
        userEmail: email,
      };
      console.log(reqData);
      await app.emailPasswordAuth
        .registerUser({
          email,
          password,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      throw error;
    }
  }

  async function verifyUserEmail(token, tokenId) {
    try {
      console.log("toverify", { token, tokenId });
      await app.emailPasswordAuth.confirmUser({ token, tokenId });

      navigate("/login");
      // User email address confirmed.
      console.log("Successfully confirmed user.");
    } catch (err) {
      navigate("/signup");
      console.log(`User confirmation failed: ${err}`);
    }
  }

  async function fetchUser() {
    if (!app.currentUser) return false;
    try {
      // await app.currentUser.refreshCustomData();
      setAuthenticatedUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      throw error;
    }
  }

  const logOutUser = async () => {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.logOut();
      setAuthenticatedUser(null);
      return true;
    } catch (error) {
      throw error;
    }
  };

  const requestForPasswordReset = async (email, password) => {
    try {
      // await app.emailPasswordAuth.sendResetPasswordEmail({ email });
      console.log({ email, password })
      await app.emailPasswordAuth.callResetPasswordFunction({email, password});
    } catch (err) {
      throw err;
    }
  };

  const resetPassword = async (token, tokenId, newPassword) => {
    try {
      await app.emailPasswordAuth.resetPassword({
        password: newPassword,
        token,
        tokenId,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        resetPassword,
        requestForPasswordReset,
        emailPasswordLogin,
        emailPasswordSignup,
        logOutUser,
        authenticatedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;











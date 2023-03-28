import { createContext, useEffect, useState } from "react";
import * as Realm from "realm-web";

const app = new Realm.App({ id: "fyntuneshop-rqhdc" });

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  useEffect(() => {
    fetchUser();
  }, []);

  async function emailPasswordLogin(email, password) {
    const credentials = Realm.Credentials.emailPassword(email, password);
    const authedUser = await app.logIn(credentials);
    setAuthenticatedUser(authedUser);
    return authedUser;
  }
  async function emailPasswordSignup(email, password) {
    try {
      await app.emailPasswordAuth.registerUser({ email, password });
      return emailPasswordLogin(email, password);
    } catch (error) {
      throw error;
    }
  }

  async function fetchUser() {
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();
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

  return (
    <UserContext.Provider
      value={{
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

import React from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  userIdSet: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(initialToken);
  const [userId, setUserId] = React.useState(
    localStorage.getItem("userId" || "")
  );
  const isLoggedIn = !!token;

  function loginHandler(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function userIdHandler(userId) {
    localStorage.setItem("userId", userId);
    setUserId(userId);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setToken(null);
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    userId: userId,
    userIdSet: userIdHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

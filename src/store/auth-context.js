import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(initialToken);
  const isLoggedIn = !!token;

  function loginHandler(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
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

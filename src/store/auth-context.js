import React from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  emailId: "",
  imageUrl: "",
  userName: "",
  isLoggedIn: false,
  imageUrlSet: () => {},
  userNameSet: () => {},
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider(props) {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(initialToken);
  const [emailId, setEmailId] = React.useState(
    localStorage.getItem("emailId")
  );
  const [userId, setUserId] = React.useState(
    localStorage.getItem("userId")
  );
  const [imageUrl, SetImageUrl] = React.useState(
    localStorage.getItem("imageUrl")
  );
  const [userName, SetUserName] = React.useState(
    localStorage.getItem("userName")
  );
  const isLoggedIn = !!token;

  function loginHandler(token, emailId, userId, imageUrl) {
    localStorage.setItem("token", token);
    setToken(token);
    localStorage.setItem("emailId", emailId);
    setEmailId(emailId);
    localStorage.setItem("userId", userId);
    setUserId(userId);
    localStorage.setItem("imageUrl", imageUrl);
    SetImageUrl(imageUrl);
  }

  function imageIdHandler(imageUrl) {
    localStorage.setItem("imageUrl", imageUrl);
    SetImageUrl(imageUrl);
  }

  function userNameHandler(userName) {
    localStorage.setItem("userName", userName);
    SetUserName(userName);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("emailId");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("userName");
    setToken(null);
  }

  const contextValue = {
    token: token,
    isLoggedIn: isLoggedIn,
    userId: userId,
    emailId: emailId,
    imageUrl: imageUrl,
    userName: userName,
    imageUrlSet: imageIdHandler,
    userNameSet: userNameHandler,
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

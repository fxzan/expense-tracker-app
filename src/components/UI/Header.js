import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import "./Header.css";
import logoutImg from "./logout.png";
import homeImg from "./wallet.png";

function Header() {
  const authCtx = React.useContext(AuthContext);
  const navigate = useNavigate();

  const defaultPhoto = "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png";

  function logoutHandler() {
    authCtx.logout();
    navigate("/login", {replace: true});
  }
  
  return (
    <>
      {authCtx.isLoggedIn &&
        <div className="header">
          <div className="log-out-container">
            <img className="log-out" onClick={logoutHandler} src={logoutImg} alt="Logout" />
          </div>
          <div className="home-icon-container">
            <img className="home-icon" onClick={() => navigate("/expenses")} src={homeImg} alt="Expenses" />
          </div>
          <div className="profile-icon-container" onClick={() => navigate("/user-profile")}>
            <img className="profile-icon" src={authCtx.imageUrl || defaultPhoto} alt="" />
          </div>
        </div>
      }
    </>
  );
}

export default Header;

import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useState, useEffect, use } from "react";
import Card from "../components/UI/Card";
import UserProfileForm from "../components//UserProfile/UserProfileForm";
import AuthContext from "../store/auth-context";
import "./UserProfile.css";
import homeImg from "../components/UI/wallet.png";
import InfoModalContext from "../store/infoModal-context";

function UserProfile() {
  const info = useContext(InfoModalContext);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isEmailVerified, setEmailVerified] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const defaultPhoto =
    "https://e7.pngegg.com/pngimages/798/436/png-clipart-computer-icons-user-profile-avatar-profile-heroes-black.png";

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error.message === "INVALID_ID_TOKEN") {
          info.showModal("Logged out due to session expiry");
          authCtx.logout();
          return;
        }
        console.log(data.error);
        authCtx.logout();
        throw new Error(`${data.error.code} ${data.error.message}`);
      }
      
      setEmailVerified(data.users[0].emailVerified);
      authCtx.userNameSet(data.users[0].displayName);
      authCtx.imageUrlSet(data.users[0].photoUrl || "");
    } catch (error) {
      alert(error);
    }
  }, [authCtx]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const updateUserDetails = async (userData) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8",
        {
          method: "POST",
          body: JSON.stringify({
            ...userData,
            idToken: authCtx.token,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.error.code} ${data.error.message}`);
      }

      fetchUserDetails();
    } catch (error) {
      alert(error);
    }
  };

  async function verifyEmailHandler() {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            requestType: "VERIFY_EMAIL",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.error.code} ${data.error.message}`);
      }
      console.log(data);
      info.showModal("Verification link sent to your email.");
      fetchUserDetails();
    } catch (error) {
      alert(error);
    }
  }

  function editProfileHandler() {
    setIsEditing(true);
  }

  function closeEditHandler() {
    setIsEditing(false);
  }

  return (
    <Card className="user-profile">
      <h1>Profile</h1>
      <div className="user-details">
          <img src={authCtx.imageUrl || defaultPhoto} alt="" />
          <p>{authCtx.userName}
            <br/>
            <span className="user-details-email">{authCtx.emailId}</span>
            {!isEmailVerified && (
              <span className="email-verify" onClick={verifyEmailHandler}>
                (Verify)
              </span>
            )}
          </p>
        </div>
      {!isEditing && (
        <button className="action-button" onClick={editProfileHandler}>
          Edit Profile
        </button>
      )}
      {isEditing && (
        <UserProfileForm
          details={{ name: authCtx.userName, photo: authCtx.imageUrl, userId: authCtx.userId }}
          onClose={closeEditHandler}
          onSubmitForm={updateUserDetails}
        />
      )}
      {!isEditing && (
        <div className="expenses-link-container" onClick={() => navigate("/expense-tracker-app/expenses")}>
          <img className="expenses-icon" src={homeImg} alt="Expenses" />
          <span className="expenses-link">Expenses</span>
        </div>
      )}
    </Card>
  );
}

export default UserProfile;

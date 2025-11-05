import React from "react";
import Card from "../components/UI/Card";
import AuthContext from "../store/auth-context";
import "./Auth.css";
import { Link } from "react-router-dom";
import InfoModalContext from "../store/infoModal-context";

function Auth() {
  const authCtx = React.useContext(AuthContext);
  const modalCtx = React.useContext(InfoModalContext);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const confPassRef = React.useRef();

  const fetchUserDetails = async (idToken) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    authCtx.userNameSet(data.users[0].displayName);
  }
  
  async function loginHandler(event) {
    event.preventDefault();
    let url;
    if (isSignUp)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8";

    try {
      if (isSignUp && passRef.current.value !== confPassRef.current.value) {
        throw new Error("Passwords don't match!");
      }

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(`${data.error.message}`);
      }
      else {
        const data = await response.json();

        console.log(data);
        await fetchUserDetails(data.idToken);
        authCtx.login(data.idToken, data.email, data.localId, data.profilePicture);
      }
    } catch (error) {
      modalCtx.showModal(error);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>{!isSignUp ? "Login" : "Sign Up"}</h1>
        <form onSubmit={loginHandler}>
          <input id="email" type="email" placeholder="Email" ref={emailRef} required/>
          <input
            id="password"
            type="password"
            placeholder="Password"
            ref={passRef}
            required
          />
          {isSignUp && (
            <input
              id="conf-password"
              type="password"
              placeholder="Confirm Password"
              ref={confPassRef}
              required
            />
          )}
          <button className="action-button">
            {!isSignUp ? "Login" : "Sign Up"}
          </button>
          {!isSignUp && (
            <Link to="/expense-tracker-app/reset-password">
              <span className="link-text forgot">Forgot Password?</span>
            </Link>
          )}
        </form>
        <span>
          {!isSignUp ? "Create an account? " : "Have an account? "}
          <span className="link-text" onClick={() => setIsSignUp(!isSignUp)}>
            {!isSignUp ? "Sign Up" : "Login"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Auth;

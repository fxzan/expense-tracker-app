import React from "react";
import Card from "../UI/Card";
import AuthContext from "../../store/auth-context";
import "./Auth.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Auth() {
  const history = useHistory();
  const authCtx = React.useContext(AuthContext);
  const [isLogin, setIsLogin] = React.useState(true);
  const emailRef = React.useRef();
  const passRef = React.useRef();
  const confPassRef = React.useRef();

  async function loginHandler(event) {
    event.preventDefault();
    let url;
    if (!isLogin)
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8";
    else
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8";

    try {
      if (!isLogin && passRef.current.value !== confPassRef.current.value) {
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
        console.log(data);
        throw new Error(`${data.error.code} ${data.error.message}`);
      }

      const data = await response.json();
      console.log(data);
      authCtx.login(data.idToken);
      history.replace("/expense-tracker-app/user-profile");
    } catch (error) {
      alert(error);
    }
  }

  function changeLoginMode() {
    setIsLogin((prev) => !prev);
  }

  return (
    <Card className="auth-form">
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={loginHandler}>
        <input id="email" type="email" placeholder="Email" ref={emailRef} />
        <input
          id="password"
          type="password"
          placeholder="Password"
          ref={passRef}
        />
        {!isLogin && (
          <input
            id="conf-password"
            type="password"
            placeholder="Confirm Password"
            ref={confPassRef}
          />
        )}
        <button className="action-button">
          {isLogin ? "Login" : "Sign Up"}
        </button>
        {isLogin && (
          <Link to="/expense-tracker-app/reset-password">
            <span className="link-text forgot">Forgot Password?</span>
          </Link>
        )}
        <span>
          {isLogin ? "Create an account? " : "Have an account? "}
          <span className="link-text" onClick={changeLoginMode}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </span>
      </form>
    </Card>
  );
}

export default Auth;

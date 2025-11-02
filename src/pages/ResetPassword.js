import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();
  const emailRef = React.useRef();
  const [isLinkSent, setLinkSent] = React.useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAHCllFnY4Mo96hjGkLBxgwU5MuQ9ztMb8",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailRef.current.value,
            requestType: "PASSWORD_RESET",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);
        throw new Error(`${data.error.code} ${data.error.message}`);
      }

      console.log(data);
      setLinkSent(true);
    } catch (error) {
      alert(error);
    }
  }

  function returnHandler() {
    navigate("/expense-tracker-app/login");
  }

  return (
    <Card className="reset-password-form">
      <h1>Reset Password</h1>
      {!isLinkSent && (
        <form onSubmit={submitHandler}>
          <input id="email" type="email" placeholder="Email" ref={emailRef} />
          <button className="action-button">Send Code</button>
        </form>
      )}
      {isLinkSent && (
        <div className="success-reset">
          <p>Successfully sent password reset link to your email.</p>
          <button className="action-button" onClick={returnHandler}>
            Return to Login
          </button>
        </div>
      )}
    </Card>
  );
}

export default ResetPassword;

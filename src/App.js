import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import ExpensesPage from "./pages/ExpensesPage";
import UserProfile from "./components/UserProfile/UserProfile";
import AuthContext from "./store/auth-context";
import Header from "./components/UI/Header";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  const authCtx = React.useContext(AuthContext);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          {!authCtx.isLoggedIn && <Redirect to="/expense-tracker-app/login" />}
          {authCtx.isLoggedIn && (
            <Redirect to="/expense-tracker-app/expenses" />
          )}
        </Route>
        <Route path="/expense-tracker-app" exact>
          {!authCtx.isLoggedIn && <Redirect to="/expense-tracker-app/login" />}
          {authCtx.isLoggedIn && (
            <Redirect to="/expense-tracker-app/user-profile" />
          )}
        </Route>
        <Route path="/expense-tracker-app/login">
          {!authCtx.isLoggedIn && <Auth />}
          {authCtx.isLoggedIn && (
            <Redirect to="/expense-tracker-app/user-profile" />
          )}
        </Route>
        <Route path="/expense-tracker-app/expenses" exact>
          {!authCtx.isLoggedIn && <Redirect to="/expense-tracker-app/login" />}
          {authCtx.isLoggedIn && <ExpensesPage />}
        </Route>
        <Route path="/expense-tracker-app/user-profile">
          {!authCtx.isLoggedIn && <Redirect to="/expense-tracker-app/login" />}
          {authCtx.isLoggedIn && <UserProfile />}
        </Route>
        <Route path="/expense-tracker-app/reset-password">
          <ResetPassword />
        </Route>
        <Route path="/*">
          {!authCtx.isLoggedIn && <Redirect to="/expense-tracker-app/login" />}
          {authCtx.isLoggedIn && (
            <Redirect to="/expense-tracker-app/user-profile" />
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;

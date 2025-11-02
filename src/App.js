import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import ExpensesPage from "./pages/ExpensesPage";
import UserProfile from "./pages/UserProfile";
import AuthContext from "./store/auth-context";
import Header from "./components/UI/Header";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const authCtx = React.useContext(AuthContext);

  return (
    <>
      <div className="content-container">
        <Header />
        <Routes>
          <Route path="/" exact element={
            !authCtx.isLoggedIn ? <Navigate to="/expense-tracker-app/login" replace /> : <Navigate to="/expense-tracker-app/expenses" replace/>
          } />
          <Route path="/expense-tracker-app" exact element={
            !authCtx.isLoggedIn ? <Navigate to="/expense-tracker-app/login" replace /> : <Navigate to="/expense-tracker-app/expenses" replace/>
          } />
          <Route path="/expense-tracker-app/login" element={
            !authCtx.isLoggedIn ? <Auth /> : <Navigate to="/expense-tracker-app/expenses" replace/>
          } />
          <Route path="/expense-tracker-app/expenses" exact element={
            !authCtx.isLoggedIn ? <Navigate to="/expense-tracker-app/login" replace /> : <ExpensesPage />
          } />
          <Route path="/expense-tracker-app/user-profile" element={
            !authCtx.isLoggedIn ? <Navigate to="/expense-tracker-app/login" replace /> : <UserProfile />
          } />
          <Route path="/expense-tracker-app/reset-password" element={<ResetPassword />
          } />
          <Route path="/*" element={
            !authCtx.isLoggedIn ? <Navigate to="/expense-tracker-app/login" replace /> : <Navigate to="/expense-tracker-app/expenses" replace />
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;

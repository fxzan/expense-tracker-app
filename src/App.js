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
            !authCtx.isLoggedIn ? <Navigate to="/login" replace /> : <Navigate to="/expenses" replace/>
          } />
          <Route path="/expense-tracker-app" exact element={
            !authCtx.isLoggedIn ? <Navigate to="/login" replace /> : <Navigate to="/expenses" replace/>
          } />
          <Route path="/login" element={
            !authCtx.isLoggedIn ? <Auth /> : <Navigate to="/expenses" replace/>
          } />
          <Route path="/expenses" exact element={
            !authCtx.isLoggedIn ? <Navigate to="/login" replace /> : <ExpensesPage />
          } />
          <Route path="/user-profile" element={
            !authCtx.isLoggedIn ? <Navigate to="/login" replace /> : <UserProfile />
          } />
          <Route path="/reset-password" element={<ResetPassword />
          } />
          <Route path="/*" element={
            !authCtx.isLoggedIn ? <Navigate to="/login" replace /> : <Navigate to="/expenses" replace />
          } />
        </Routes>
      </div>
    </>
  );
}

export default App;

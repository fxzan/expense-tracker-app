import { Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import ExpensesPage from "./pages/ExpensesPage";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/expense-tracker-app/login" />
      </Route>
      <Route path="/expense-tracker-app/login">
        <Auth />
      </Route>
      <Route path="/expense-tracker-app/expenses">
        <ExpensesPage />
      </Route>
    </Switch>
  );
}

export default App;
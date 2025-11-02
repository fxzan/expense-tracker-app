import React, { useState } from "react";
import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense/NewExpense";
import supabase from "../helper/supabaseClient";
import AuthContext from "../store/auth-context";
import Card from "../components/UI/Card";

const ExpensesPage = () => {
  const authCtx = React.useContext(AuthContext);
  const [expensesData, setExpensesData] = useState([]);

  const fetchExpenseData = React.useCallback(async () => {
    try {
      const {data, error} = await supabase.from("expenses").select("*").eq("user_id", authCtx.userId).order("date", {ascending : false});
      
      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }

      setExpensesData(data || []);
    } catch (error) {
      alert(error);
    }
  }, [authCtx.userId]);

  React.useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  async function addExpenseHandler(expense) {
    try {
      const {data, error} = await supabase.from("expenses").insert(expense).select();

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }
      fetchExpenseData();
    } catch (error) {
      alert(error);
    }
  }

  async function deleteExpenseHandler(id) {
    try {
      const {data, error} = await supabase.from("expenses").delete().eq("id", id).eq("user_id", authCtx.userId);

      if (error) {
        console.log(error);
        throw new Error(`${error.code} ${error.message}`)
      }
      fetchExpenseData();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <Card className="new-expense">
      <NewExpense onAddExpenseData={addExpenseHandler} />
      <Expenses items={expensesData} onDelete={deleteExpenseHandler} />
    </Card>
  );
};

export default ExpensesPage;

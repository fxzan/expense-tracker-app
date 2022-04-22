import React, { useState } from "react";
import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense/NewExpense";
import AuthContext from "../store/auth-context";

const ExpensesPage = () => {
  const authCtx = React.useContext(AuthContext);
  const [expensesData, setExpensesData] = useState([]);

  const fetchExpenseData = React.useCallback(async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-28402-default-rtdb.asia-southeast1.firebasedatabase.app/${authCtx.userId}/expenses.json`
      );
      const data = await response.json();
      if (!response.ok) {
        console.log(data)
        throw new Error(`${data.error.code} ${data.error.message}`)
      }
      const expenseList = [];
        for (let key in data) {
        expenseList.push({ ...data[key], id: key });
      }
      setExpensesData(expenseList);
    } catch (error) {
      alert(error);
    }
  }, [authCtx.userId]);

  React.useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  async function addExpenseHandler(expense) {
    try {
      const response = await fetch(
        `https://expense-tracker-28402-default-rtdb.asia-southeast1.firebasedatabase.app/${authCtx.userId}/expenses.json`,
        {
          method: "POST",
          body: JSON.stringify(expense),
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
      fetchExpenseData();
    } catch (error) {
      alert(error);
    }
  }

  async function deleteExpenseHandler(id) {
    try {
      const response = await fetch(
        `https://expense-tracker-28402-default-rtdb.asia-southeast1.firebasedatabase.app/${authCtx.userId}/expenses/${id}.json`,
        {
          method: "DELETE",
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
      fetchExpenseData();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div>
      <NewExpense onAddExpenseData={addExpenseHandler} />
      <Expenses items={expensesData} onDelete={deleteExpenseHandler} />
    </div>
  );
};

export default ExpensesPage;

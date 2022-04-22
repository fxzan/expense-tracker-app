import React, { useState } from "react";
import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense/NewExpense";

const ExpensesPage = () => {
  const initialExpensesData =
    JSON.parse(localStorage.getItem("ExpensesData")) || [];

  let lastID = JSON.parse(localStorage.getItem("ID")) || 0;

  const [expensesData, setExpensesData] = useState(initialExpensesData);
  const [idNum, setIdNum] = useState(lastID + 1);

  function addExpenseHandler(expense) {
    setExpensesData((prevList) => {
      const newExpenses = [...prevList, { id: "e" + idNum, ...expense }];
      localStorage.setItem("ExpensesData", JSON.stringify(newExpenses));
      localStorage.setItem("ID", idNum);
      return newExpenses;
    });
    setIdNum(idNum + 1);
  }

  function deleteExpenseHandler(id) {
    setExpensesData((prevList) => {
      const newExpenses = prevList.filter((expense) => {
        return expense.id !== id;
      });
      localStorage.setItem("ExpensesData", JSON.stringify(newExpenses));
      return newExpenses;
    });
  }

  return (
    <div>
      <NewExpense onAddExpenseData={addExpenseHandler} />
      <Expenses items={expensesData} onDelete={deleteExpenseHandler} />
    </div>
  );
};

export default ExpensesPage;

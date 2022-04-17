import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import "./Expenses.css";

function Expenses(props) {
  const [filteredYear, setFilteredYear] = useState(2019);

  function filterChangeHandler(selectedYear) {
    setFilteredYear(selectedYear);
  }

  const filteredExpenses = props.items.filter((expense) => {
    return new Date(expense.date).getFullYear().toString() === `${filteredYear}`;
  });

  function deleteHandler(itemKey) {
    props.onDelete(itemKey);
  }

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} onDelete={deleteHandler} />
    </Card>
  );
}

export default Expenses;

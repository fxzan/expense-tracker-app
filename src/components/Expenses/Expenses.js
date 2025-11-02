import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import "./Expenses.css";

function Expenses(props) {
  const [yearList, setYearList] = useState([]);
  const [filteredYear, setFilteredYear] = useState("All");

  console.log(filteredYear);

  React.useEffect(() => {
    const listOfYears = [... new Set(props.items.map(item => new Date(item.date).getFullYear().toString()))].sort().reverse();
    setYearList(listOfYears);
  }, [props.items]);

  function filterChangeHandler(selectedYear) {
    setFilteredYear(selectedYear);
  }

  const filteredExpenses = props.items.filter((expense) => {
    if (filteredYear === "All") {
      return (expense);
    }
    return (
      new Date(expense.date).getFullYear().toString() === `${filteredYear}`
    );
  });

  function deleteHandler(itemKey) {
    props.onDelete(itemKey);
  }

  return (
    <div className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        years={yearList}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} onDelete={deleteHandler} />
    </div>
  );
}

export default Expenses;

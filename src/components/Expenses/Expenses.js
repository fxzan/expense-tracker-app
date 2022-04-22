import React, { useState } from "react";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../UI/Card";
import "./Expenses.css";

function Expenses(props) {
  const [yearList, setYearList] = useState([]);
  const [filteredYear, setFilteredYear] = useState(yearList[0]);

  React.useEffect(() => {
    let listOfYears = {};
    props.items.forEach((item) => {
      listOfYears[new Date(item.date).getFullYear().toString()] = 1;
    });
    listOfYears = Object.keys(listOfYears)
      .filter((key) => key)
      .sort()
      .reverse();
    setYearList(listOfYears);
    setFilteredYear(listOfYears[0]);
  }, [props.items]);

  function filterChangeHandler(selectedYear) {
    setFilteredYear(selectedYear);
  }

  const filteredExpenses = props.items.filter((expense) => {
    return (
      new Date(expense.date).getFullYear().toString() === `${filteredYear}`
    );
  });

  function deleteHandler(itemKey) {
    props.onDelete(itemKey);
  }

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        years={yearList}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <ExpensesList items={filteredExpenses} onDelete={deleteHandler} />
    </Card>
  );
}

export default Expenses;

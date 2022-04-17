import React from "react";
import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css';

function ExpensesList(props) {
  function deleteHandler(itemID) {
    props.onDelete(itemID);
  }
  let expensesContent = <h2 className="expenses-list__fallback">No expenses found.</h2>;

  if (props.items.length > 0) {
    expensesContent = props.items.map((expense) => (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={new Date(expense.date)}
        onDelete={deleteHandler}
      />
    ));
    if (expensesContent.length === 1)
      expensesContent.push(<p key="ONE" className="expenses-list__fallback">Only ONE expense here.</p>);
  }

  return <ul className="expenses-list">{expensesContent}</ul>;
}

export default ExpensesList;

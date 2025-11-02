import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  function saveExpenseDataHandler(enteredData) {
    props.onAddExpenseData(enteredData);
    setIsEditing(false);
  }

  return (
    <div className="new-expense">
      {!isEditing ? (
        <button className="action-button" onClick={() => setIsEditing(true)}>Add New Expense</button>
      ) : (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default NewExpense;

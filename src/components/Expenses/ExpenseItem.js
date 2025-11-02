import React from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import "./ExpenseItem.css";
import deleteImg from "./delete.png";

function ExpenseItem(props) {
  function deleteHandler() {
    props.onDelete(props.id);
  }
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.date}></ExpenseDate>
        <div className="expense-item__description">
          <h2>{props.title}</h2>
          <div className="expense-item__price">${props.amount}</div>
          <img className="expense-item__delete" onClick={deleteHandler} src={deleteImg} alt="Delete" />
        </div>
      </Card>
    </li>
  );
}

export default ExpenseItem;

import React from "react";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  function dropdownChangeHandler(event) {
    props.onChangeFilter(event.target.value);
  }

  const curYear = new Date().getFullYear().toString();
  const options = props.years.map((year) => <option key={year} value={year}>{year}</option>);

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          {options.length !== 0 ? (
            options
          ) : (
            <option value={curYear}>{curYear}</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;

import React from "react";

//component for filtering todo

export default class Settings extends React.Component {
  render() {
    return (
      <div className="side-container settings-container">
        <span>Filter Tasks </span>
        <select
          className="select-filter"
          name="filter"
          onChange={e => {
            this.props.filterData(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="notDone">Not Done</option>
        </select>
      </div>
    );
  }
}

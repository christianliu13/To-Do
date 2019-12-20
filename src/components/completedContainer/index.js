import React from "react";

//component for displaying completed items

export default class Complete extends React.Component {
  render() {
    return (
      <div className="side-container completed-container">
        <h1>{this.props.completedCount}</h1>
        <h3>
          Task
          {this.props.completedCount > 1 || this.props.completedCount === 0
            ? "s"
            : ""}{" "}
          Left
        </h3>
      </div>
    );
  }
}

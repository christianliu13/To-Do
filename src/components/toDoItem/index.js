import React from "react";
import "./toDoItem.css";

//component for the todo item

export default class Item extends React.Component {
  render() {
    console.log(this.props);
    return (
      <li
        className={`line-item box-shadow ${
          this.props.item.done ? "completed-item" : ""
        }`}
      >
        <h3 title={this.props.item.content}>
          {this.props.index + 1}. {this.props.item.content}
        </h3>
        <h6 className="timestamp">{this.props.item.time}</h6>
        <span
          className="subtext teal"
          title="Complete Task"
          onClick={() => this.props.completeItem(this.props.index)}
        >
          complete
        </span>
        <span
          className="subtext red"
          title="Remove Task"
          onClick={() => this.props.removeItem(this.props.index)}
        >
          remove
        </span>
      </li>
    );
  }
}

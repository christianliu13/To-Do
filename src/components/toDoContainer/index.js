import React from "react";
import ToDoItem from "../toDoItem/index.js";
import CompletedContainer from "../completedContainer/index.js";
import ToDoSettings from "../toDoSettings/index.js";

import "./container.css";
import { thisTypeAnnotation } from "@babel/types";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      newItem: "",
      completedCount: 0,
      filter: "all" //true for done, false for not done, nothing for no filter
    };
  }

  componentDidMount() {
    //on load, get completed count
    if (this.state.data) {
      let count = 0;
      this.state.data.forEach(item => {
        if (item.done === false) {
          count += 1;
        }
      });
      this.setState({ completedCount: count });
    }
  }

  addItem() {
    //on click, add item
    if (this.state.newItem === "") {
      alert("Please add a task to do!");
      return;
    }
    
    let date = new Date()
    let dateString = date.getMonth() + "-" + date.getDay() + "-" + date.getFullYear() +", " + date.getHours() + ":" + date.getMinutes()
  
    const item = {
      content: this.state.newItem,
      done: false,
      time: dateString
    };
    let copy = [...this.state.data, item];

    this.setState(prevState => {
      return { completedCount: prevState.completedCount + 1, newItem: "" };
    });
    this.updateApp(copy);
  }

  removeItem(index) {
    //on click remove item
    let copy = [...this.state.data];
    copy.splice(index, 1);

    this.setState(prevState => {
      return { completedCount: prevState.completedCount - 1 }; //adjust task counter
    });
    this.updateApp(copy);
  }

  completeItem(index) {
    //on click remove item
    let copy = [...this.state.data];
    copy[index].done = true;

    this.setState(prevState => {
      return { completedCount: prevState.completedCount - 1, newItem: "" };
    });
    this.updateApp(copy);
  }

  removeComplete() {
    //remove completed items
    let copy = [...this.state.data].filter(item => item.done !== true);

    this.updateApp(copy);
  }

  updateApp(data) {
    this.setState({ data: data }); //updates state and resets input field

    let newArray = { tasks: data };
    localStorage.setItem("ToDo", JSON.stringify(newArray));
  }

  updateInput(key, value) {
    //for updating state from input
    this.setState({
      [key]: value
    });
  }

  filterData(filter) { //allowing for filtering items
    let filterData;
    switch (filter) {
      case "done":
        filterData = true;
        break;
      case "notDone":
        filterData = false;
        break;
      default:
        filterData = "all";
        break;
    }
    this.setState({ filter: filterData });
  }

  render() {
    return (
      <div className="app-container">
        <div className="settings-block">
          <CompletedContainer
            completedCount={this.state.completedCount}
          ></CompletedContainer>
          <ToDoSettings
            clearComplete={this.removeComplete.bind(this)}
            filterData={this.filterData.bind(this)}
          ></ToDoSettings>
          <div
            className="subtext clear-complete teal"
            onClick={this.removeComplete.bind(this)}
          >
            Clear Completed
          </div>
        </div>

        <div className="to-do-container">
          <ul>
            {this.state.data.map((item, i) => {
              //repeating line items with a filter

              if (
                this.state.filter == "all" ||
                item.done === this.state.filter
              ) {
                return (
                  <ToDoItem
                    item={item}
                    removeItem={this.removeItem.bind(this)}
                    key={i}
                    index={i}
                    completeItem={this.completeItem.bind(this)}
                  ></ToDoItem>
                );
              }
            })}
            <li className="input-section">
              <input
                className="input-field box-shadow"
                type="text"
                value={this.state.newItem}
                placeholder="What do you want to do?"
                onChange={e => this.updateInput("newItem", e.target.value)}
              ></input>

              <button
                className="input-button"
                onClick={this.addItem.bind(this)}
              >
                + Add
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

import React from "react";

import { ReactComponent as Hamburger } from "./hamburger.svg";
import "./App.css";

export default class App extends React.Component {
  state = {
    items: ["🍰 Cake", "🍩 Donut", "🍎 Apple", "🍕 Pizza"]
  };

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index];
	this.draggedIdx = index;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = (e, index) => {
	  e.preventDefault();
	  e.stopPropagation();
  };

  onDragEnd = () => {
    //this.draggedIdx = null;
  };

  onDrop = (e, id) => {
	console.log("dragged index ",this.draggedIdx);
	console.log("dropped index ",id);
	const draggedOverItem = this.state.items[id];

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return;
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem);

    // add the dragged item after the dragged over item
    items.splice(id, 0, this.draggedItem);

    this.setState({ items });
	this.draggedItem = null;
	this.draggedIdx = null;
  }

  render() {
    return (
      <div className="App">
        <main>
          <h3>List of items</h3>
          <ul>
            {this.state.items.map((item, idx) => (
              <li key={item} onDragOver={(e) => this.onDragOver(e, idx)} onDrop={(e) => this.onDrop(e, idx)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => this.onDragStart(e, idx)}
                  onDragEnd={this.onDragEnd}
                >
                  <Hamburger />
                </div>
                <span className="content">{item}</span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    );
  }
}

import { React, useState, useEffect } from "react";
import {v4 as myNewID} from "uuid";

import "./App.css";

// button-group
const buttons = [
  {
    name: "all",
    label: "All",
  },
  { 
    name: "active",
    label: "Active",
  },
  {
    name: "done",
    label: "Done",
  },
];

// todoItems array

function App() {
     const [items, setItems] = useState([
  {
    key: 1,
    label: "Have fun",
  },
  {
    key: 2,
    label: "Generate value",
  },
  {
    key: 3,
    label: "Spread empathy",
  },
]);

  const handleToDoChange = (event) => {
    setItemToDo(event.target.value);
    
  }
  const [ItemToDo, setItemToDo] = useState("");
  const [searchToDo, setSearchToDo] = useState(""); 


  
  const handleItemDone = ({key}) => {
    const copyItems = [...items];
    const findIndex = copyItems.findIndex((item) => item.key === key)
    
    copyItems[findIndex] = { ...copyItems[findIndex], done: !copyItems[findIndex]?.done }

    setItems(copyItems)
  }

  const getFilteredItemWithoutSelected = (array, itemKey) => array.filter(item => item.key !== itemKey)


  const handleItemRemove = ({key}) => {
    const itemsWithoutSelectedItem = getFilteredItemWithoutSelected(items, key)

    setItems([...itemsWithoutSelectedItem ])
  }

  const handleItemImportant = ({key}) => {
    const itemToMakeImportant = items.find(item => item.key === key)
    const itemsWithoutSelectedItem = getFilteredItemWithoutSelected(items, key)

    setItems([...itemsWithoutSelectedItem, {...itemToMakeImportant, important: !itemToMakeImportant?.important}])
  }

  const handleAddItem = () => {
    const newItem = {key: myNewID(), label:ItemToDo};
    const newItems = items;
    newItems.push(newItem);
    setItems([...newItems])
  }  
      const handleToDoSearch = (event) => {
        setSearchToDo(event.target.value);
        };

    const searchArray = items.filter(item =>
        item.label.substring(0, searchToDo.length).toLowerCase() === searchToDo.toLowerCase())

    const arraySF = !searchToDo ? items : searchArray


    useEffect(()=>{
        items.map((item)=>localStorage.setItem(item.key, item.label))
        let newNewArray = [];
        for(let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) {
                continue;
            }
            let newNewItem = {
                key: key,
                label: localStorage.getItem(key)
            }
            newNewArray.push(newNewItem)
        }
        setItems(newNewArray)
    }, [])

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>5 more to do, 3 done</h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          value={searchToDo}
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          onChange = {handleToDoSearch}
        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {buttons.map((button) => (
              <button key={button.label} type="button" className="btn btn-info">
                    {button.label}
              </button> 
          ))}
        </div>
      </div>

      {/* List-group */}
      {<ul className="list-group todo-list">
                {arraySF.length > 0 &&
                    arraySF.map((item) => (
                        <li key={item.key} className="list-group-item">
              <span className={`todo-list-item ${item.done ? "done" : ""} ${item.important ? "important" : ""}`}>
                <span
                    className="todo-list-item-label"
                    onClick={() => handleItemDone(item)}
                >
                  {item.label}
                </span>

                <button
                    type="button"
                    onClick={() => handleItemImportant(item)}
                    className="btn btn-outline-success btn-sm float-right"
                >
                  <i className="fa fa-exclamation"/>
                </button>

                <button
                    type="button"
                    onClick={() => handleItemRemove(item)}
                    className="btn btn-outline-danger btn-sm float-right"
                >
                  <i className="fa fa-trash-o"/>
                </button>
              </span>
                        </li>
                    ))}
            </ul>
}

      <div className="item-add-form d-flex">
        <input
          value={ItemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange={handleToDoChange}

        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>Add item</button>
      </div>
    </div>
  );
}

export default App;

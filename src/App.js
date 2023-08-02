import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form addItems={handleAddItems} />
      <PackingList
        items={items}
        deleteItems={handleDeleteItems}
        toggleItems={handleToggle}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ addItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    };
    console.log(newItem);

    addItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        id="userSelection"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        id="userInput"
        placeholder="Type your text here"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, deleteItems, toggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            deleteItems={deleteItems}
            toggleItems={toggleItems}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, deleteItems, toggleItems }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => toggleItems(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button
        style={item.packed ? { display: "none" } : {}}
        onClick={() => deleteItems(item.id)}
      >
        ❌
      </button>
    </li>
  );
}

function Stats() {
  return <div className="stats">Stats</div>;
}

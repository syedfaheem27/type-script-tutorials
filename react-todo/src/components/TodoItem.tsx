import React from "react";
interface Item {
  item: string;
  onDeleteTodo(): void;
}

const TodoItem: React.FC<Item> = ({ item, onDeleteTodo }) => {
  return (
    <li className="list-item">
      <span>{item}</span>
      <button onClick={onDeleteTodo}>Delete</button>
    </li>
  );
};

export default TodoItem;

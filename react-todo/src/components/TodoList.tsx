import React from "react";
import TodoItem from "./TodoItem";

interface TodoItems {
  items: { id: string; text: string }[];
  onDeleteTodo(id: string): void;
}

const TodoList: React.FC<TodoItems> = ({ items, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {items.map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            item={todo.text}
            onDeleteTodo={onDeleteTodo.bind(null, todo.id)}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;

import React, { useState } from "react";
import NewTodo from "./components/NewTodo";
import TodoList from "./components/TodoList";

interface Todo {
  id: string;
  text: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (text: string) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { id: Math.random().toString(), text }];
    });
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  return (
    <>
      <header>
        <h1>Todo App</h1>
      </header>
      <NewTodo onAddTodo={handleAddTodo} />
      <TodoList items={todos} onDeleteTodo={handleDeleteTodo} />
    </>
  );
};

export default App;

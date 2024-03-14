import React, { useRef } from "react";

interface TodoActions {
  onAddTodo(text: string): void;
}

const NewTodo: React.FC<TodoActions> = ({ onAddTodo }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputRef.current) {
      onAddTodo(inputRef.current.value);

      inputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleTodo}>
      <div>
        <label htmlFor="todo">Todo</label>
        <input type="text" id="todo" ref={inputRef} placeholder="Add Todo..." />
      </div>
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;

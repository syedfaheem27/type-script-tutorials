import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;

  const todo = new Todo(Math.random().toString(), text);

  TODOS.push(todo);

  res.status(201).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      todos: TODOS,
    },
  });
};

export const updateTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const text = (req.body as { text: string }).text;

  const todo = TODOS.find((todo) => todo.id === id);

  if (!todo)
    return res.status(404).json({
      status: "failure",
      message: "Invalid ID",
    });

  todo.text = text;

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;

  const todoIndex = TODOS.findIndex((todo) => todo.id === id);

  if (todoIndex === -1)
    return res.status(404).json({
      status: "failure",
      message: "Invalid ID",
    });

  delete TODOS[todoIndex];

  res.status(203).json({
    status: "success",
  });
};

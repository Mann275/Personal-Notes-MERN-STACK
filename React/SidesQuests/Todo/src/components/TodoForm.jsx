import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    addTodo({ todo: todo.trim(), completed: false });
    setTodo("");
  };

  return (
    <div className="relative">
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={add}>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="📝 What needs to be done today?"
            className="w-full bg-gray-700 border-2 border-gray-600 rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-gray-400 outline-none focus:border-blue-500 focus:bg-gray-600 transition-all duration-300 text-base sm:text-lg"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={!todo.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="hidden sm:inline">Add Todo</span>
            <span className="sm:hidden">Add</span>
          </span>
        </button>
      </form>
    </div>
  );
}
export default TodoForm;

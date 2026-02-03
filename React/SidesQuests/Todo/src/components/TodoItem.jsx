import React, { useState } from "react";
import { useTodo } from "../contexts";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    if (todoMsg.trim()) {
      updateTodo(todo.id, { ...todo, todo: todoMsg.trim() });
    } else {
      setTodoMsg(todo.todo);
    }
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`group relative overflow-hidden transition-all duration-500 transform ${
        todo.completed
          ? "bg-gradient-to-r from-green-400/20 to-emerald-500/20 border-green-400/30"
          : "bg-gradient-to-r from-white/15 to-white/5 border-white/20"
      } backdrop-blur-sm border-2 rounded-2xl p-4 sm:p-6 shadow-xl hover:shadow-2xl hover:scale-[1.01]`}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
          todo.completed
            ? "bg-gradient-to-r from-green-400/10 to-emerald-500/10"
            : "bg-gradient-to-r from-purple-500/10 to-blue-500/10"
        }`}
      ></div>

      <div className="relative flex items-start sm:items-center gap-3 sm:gap-4">
        {/* Custom Checkbox */}
        <div className="relative mt-1 sm:mt-0 flex-shrink-0">
          <input
            type="checkbox"
            className="sr-only"
            checked={todo.completed}
            onChange={toggleCompleted}
            id={`todo-${todo.id}`}
          />
          <label
            htmlFor={`todo-${todo.id}`}
            className={`relative flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 cursor-pointer transition-all duration-300 ${
              todo.completed
                ? "bg-green-600 border-green-600 shadow-lg shadow-green-600/25"
                : "border-gray-500 hover:border-gray-400 bg-gray-600"
            }`}
          >
            {todo.completed && (
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 text-white animate-pulse"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </label>
        </div>

        {/* Todo Text */}
        <div className="flex-1 min-w-0 pr-2">
          <input
            type="text"
            className={`w-full bg-transparent outline-none text-base sm:text-lg font-medium transition-all duration-300 ${
              isTodoEditable
                ? "text-white bg-white/10 px-2 sm:px-3 py-1 sm:py-2 rounded-lg border-2 border-white/30 focus:border-white/60"
                : "text-white border-transparent"
            } ${
              todo.completed ? "line-through text-white/60" : ""
            } placeholder-white/50`}
            value={todoMsg}
            onChange={(e) => setTodoMsg(e.target.value)}
            readOnly={!isTodoEditable}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isTodoEditable) {
                editTodo();
              }
              if (e.key === "Escape" && isTodoEditable) {
                setTodoMsg(todo.todo);
                setIsTodoEditable(false);
              }
            }}
            placeholder="Todo text..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          {/* Edit/Save Button */}
          <button
            className={`group/btn relative overflow-hidden w-9 h-9 sm:w-11 sm:h-11 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              todo.completed
                ? "bg-gray-600 cursor-not-allowed opacity-50"
                : isTodoEditable
                  ? "bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/25"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/25"
            } disabled:transform-none`}
            onClick={() => {
              if (todo.completed) return;
              if (isTodoEditable) {
                editTodo();
              } else {
                setIsTodoEditable(true);
              }
            }}
            disabled={todo.completed}
            title={isTodoEditable ? "Save changes" : "Edit todo"}
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <div className="relative text-white text-lg">
              {isTodoEditable ? (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              )}
            </div>
          </button>

          {/* Delete Button */}
          <button
            className="group/btn relative overflow-hidden w-9 h-9 sm:w-11 sm:h-11 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg shadow-red-600/25"
            onClick={() => deleteTodo(todo.id)}
            title="Delete todo"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            <svg
              className="relative w-4 h-4 sm:w-5 sm:h-5 mx-auto text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Completion celebration effect */}
      {todo.completed && (
        <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-lg sm:text-2xl animate-bounce">
          🎉
        </div>
      )}
    </div>
  );
}

export default TodoItem;

import { useEffect, useState } from "react";
import { TodoForm, TodoItem } from "./components";
import "./App.css";
import { TodoProvider } from "./contexts";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ id: Date.now(), ...todo }, ...prevTodos]);
  };
  const updateTodo = (id, todo) => {
    setTodos((prevTodos) => prevTodos.map((t) => (t.id === id ? todo : t)));
  };
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };
  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gray-900 py-4 sm:py-8 px-2 sm:px-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4 tracking-tight">
              📋 Todo Manager
            </h1>
            <p className="text-white/80 text-sm sm:text-base md:text-lg">
              Stay organized and productive with style
            </p>
            {totalCount > 0 && (
              <div className="mt-4 inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-gray-800 border border-gray-700 rounded-lg px-4 sm:px-6 py-3 text-gray-300 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Completed: {completedCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Remaining: {totalCount - completedCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Total: {totalCount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Main Container */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8">
            <div className="mb-6 sm:mb-8">
              <TodoForm />
            </div>

            <div className="space-y-3 sm:space-y-4">
              {todos.length === 0 ? (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">
                    📝
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
                    No todos yet!
                  </h3>
                  <p className="text-white/70 text-sm sm:text-base">
                    Add your first todo above to get started
                  </p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className="w-full transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6 sm:mt-8 text-gray-500 text-sm sm:text-base">
            <p>Made with ❤️ for productivity</p>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

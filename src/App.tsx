import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, Circle, Trash2, ClipboardList } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-headerBg py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center flex items-center justify-center gap-2">
            <ClipboardList className="w-8 h-8" />
            Task Master
          </h1>
        </div>
      </div>

      {/* Todo Form */}
      <div className="max-w-3xl mx-auto px-4 -mt-8">
        <form onSubmit={addTodo} className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 p-4 rounded-lg shadow-lg border-2 border-transparent focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-headerBg text-white px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Add
          </button>
        </form>
      </div>

      {/* Todo List */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="flex justify-between text-sm mb-6">
          <span className="text-gray-600">
            Total tasks: <span className="font-bold text-blue-600">{todos.length}</span>
          </span>
          <span className="text-gray-600">
            Completed: <span className="font-bold text-green-600">{completedCount}</span>
          </span>
        </div>

        {/* List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <ClipboardList className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your todo list is empty. Add some tasks to get started!</p>
            </div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center gap-4"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </button>
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {todo.text}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-gray-500">
        <p>Stay organized with Task Master</p>
      </div>
    </div>
  );
}

export default App;
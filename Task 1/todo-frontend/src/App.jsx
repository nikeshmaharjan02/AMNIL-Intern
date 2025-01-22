import React from 'react';
import { ToastContainer } from 'react-toastify';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo App</h1>
      <div className="w-full px-4"> {/* Removed max-w-md */}
        <TodoForm />
        <TodoList />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default App;

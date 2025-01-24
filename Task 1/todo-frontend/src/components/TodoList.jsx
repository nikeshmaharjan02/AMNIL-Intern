import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

const TodoList = () => {
  const { todos, setTodos, backendUrl, getTodos } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompleted, setShowCompleted] = useState(false); 

  // Filter tasks based on search query and Completed Tasks
  const filteredTodos = todos
    .filter((todo) =>
      todo.task.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
    .filter((todo) => (showCompleted ? todo.isCompleted : true)); 

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete Task ID?')) {
      try {
        const { data } = await axios.delete(backendUrl + '/api/todos/' + id);
        toast.success(data.message);

        setSearchQuery('');
        getTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
        toast.error('Failed to delete todo. Please try again.');
      }
    }
  };

  const handleToggleCompletion = async (id, isCompleted) => {
    try {
      const { data } = await axios.put(
        backendUrl + '/api/todos/' + id + '/toggle',
        { isCompleted: !isCompleted }
      );
      toast.success(data.message);

      getTodos();
    } catch (error) {
      console.error('Error toggling completion:', error);
      toast.error('Failed to toggle completion. Please try again.');
    }
  };

  return (
    <div className="p-6 mt-3 bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
      <button
        onClick={() => setShowCompleted((prev) => !prev)}
        className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
      >
        {showCompleted ? 'Show All Tasks' : 'Show Completed Tasks'}
      </button>
    </div>

      {/* Search input only if there are tasks */}
      {todos.length > 0 && !showCompleted && (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
          className="mb-4 px-4 py-2 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      )}

      {filteredTodos.length === 0 ? (
        <p className="text-gray-500 text-center">
          {showCompleted
            ? 'No completed tasks available.'
            : 'No tasks available. Start by adding one!'}
        </p>
      ) : (
        <ul className="space-y-4">
          {filteredTodos.map((todo, index) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 border rounded-md ${
                todo.isCompleted ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-300'
              }`}
            >
              
              <span
                className={`text-gray-800 ${todo.isCompleted ? 'line-through' : ''}`}
              >
                <strong>{index + 1}. </strong>
                {todo.task}
              </span>

              <div className="flex space-x-2">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() => handleToggleCompletion(todo.id, todo.isCompleted)}
                  className="w-5 h-5 text-green-600 rounded"
                />
                <button
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;

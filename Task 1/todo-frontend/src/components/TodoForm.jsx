import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState('');
  const { backendUrl, getTodos } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) {
        toast.error('Task is required!');
        return;
    }
    try {
        const {data} =await axios.post(backendUrl + '/api/todos/', { task })
        toast.success('New todo added successfully!');

        getTodos();

        setTask('');
    } catch (error) {
        console.error('Error adding todo:', error);
        toast.success('New todo added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between p-5 bg-white border border-gray-300 rounded-lg shadow-md w-full max-w-2xl mx-auto">
    <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter your task"
        className="flex-1 px-5 py-3 text-base border rounded-l-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button type="submit" className="px-6 py-3 text-base text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 transition-colors">
        Add Task
    </button>
    </form>

  );
};

export default TodoForm;

import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const editTask = (index) => {
    setIsEditing(true);
    setCurrentTaskIndex(index);
    setNewTask(tasks[index].text);
  };

  const updateTask = () => {
    if (newTask.trim()) {
      const updatedTasks = tasks.map((task, index) =>
        index === currentTaskIndex ? { ...task, text: newTask } : task
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setNewTask('');
      setCurrentTaskIndex(null);
    }
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div className="input-group">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={isEditing ? updateTask : addTask}>
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleCompletion(index)}>{task.text}</span>
            <div className="task-actions">
              <button onClick={() => editTask(index)}>Edit</button>
              <button onClick={() => removeTask(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
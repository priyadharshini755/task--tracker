import React, { useState, useEffect } from 'react';
import Task from './Task';
import AddTask from './AddTask';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from localStorage on first load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);

    // Alert if reminder is set
    if (task.reminder) {
      alert(`🔔 Reminder set for: "${task.text}"`);

      // Browser notification
      if (Notification.permission === "granted") {
        new Notification("Reminder Added", {
          body: task.text,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            new Notification("Reminder Added", {
              body: task.text,
            });
          }
        });
      }
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <AddTask onAdd={addTask} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete={deleteTask} />
      ))}
    </div>
  );
};




export default TaskList;

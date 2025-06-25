import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  // 🔔 Reminder checker runs every second
  useEffect(() => {
    const interval = setInterval(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const now = new Date();

      tasks.forEach((task) => {
        // check if task has time and not notified
        if (task.time && !task.notified && new Date(task.time) <= now) {
          alert(`⏰ Reminder: ${task.text}`);
          task.notified = true;
        }
      });

      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, 1000); // run every second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="App">
      <Header />
      <TaskList />
    </div>
  );
}

export default App;

import React, { useState } from 'react';

const Task = ({ task, onDelete }) => {
  const [reminder, setReminder] = useState(task.reminder);

  const handleClick = () => {
    setReminder(!reminder);
  };

  return (
    <div
      className={`task ${reminder ? 'reminder' : ''}`}
      onClick={handleClick}
    >
      <h3>
        {task.text}
        <button
          style={{
            float: 'right',
            background: 'red',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          onClick={(e) => {
            e.stopPropagation(); // prevent reminder toggle
            onDelete(task.id);
          }}
        >
          Delete
        </button>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;

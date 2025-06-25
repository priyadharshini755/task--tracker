import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please enter a task');
      return;
    }

    onAdd({ text, day: reminderTime.toLocaleString(), reminder });

    setText('');
    setReminderTime(new Date());
    setReminder(false);
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: '20px' }}>
      <div>
        <label>Task</label><br />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add task"
        />
      </div>
      <div>
        <label>Reminder Date & Time</label><br />
        <DatePicker
          selected={reminderTime}
          onChange={(date) => setReminderTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
          Set Reminder
        </label>
      </div>
      <input type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;

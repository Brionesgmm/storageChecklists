import React from "react";

const DailyTasks = ({ tasks, handleCheck }) => {
  return (
    <div className="tasksSection">
      <label className="taskTitle">Daily Tasks:</label>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <label className="taskLabel" htmlFor={`dailyTask${index}`}>
            {task.label}
          </label>
          <input
            className="taskInput"
            type="checkbox"
            checked={task.checked}
            name={`dailyTask${index}`}
            id={`dailyTask${index}`}
            onChange={() => handleCheck(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default DailyTasks;

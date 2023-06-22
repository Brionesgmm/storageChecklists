import React from "react";

const DailyTasks = ({ tasks, handleCheck, readOnly }) => {
  console.log("loading daily task");
  return (
    <div className="tasksSection">
      <label className="taskTitle">Daily Tasks:</label>
      {tasks.map((task, index) => (
        <div key={index} className="task">
          <label className="taskLabel" htmlFor={`dailyTask${index}`}>
            {task.label}
          </label>
          <input
            readOnly={readOnly}
            className="taskInput"
            type="checkbox"
            checked={task.checked}
            name={`dailyTask${index}`}
            id={`dailyTask${index}`}
            onChange={() => {
              if (handleCheck) handleCheck(index);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default DailyTasks;

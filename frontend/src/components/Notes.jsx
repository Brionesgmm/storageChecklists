import React from "react";

const Notes = ({
  overlocks,
  setOverlocks,
  reverseOverlocks,
  setReverseOverlocks,
  cleans,
  setCleans,
  toDoList,
  setToDoList,
  otherNotes,
  setOtherNotes,
}) => {
  const handleInputChange = (index, setter) => (event) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = event.target.value;
      return copy;
    });
  };

  return (
    <div className="notesTab">
      <div className="notes">
        <div className="storageUnits">
          <div className="overlocks">
            <label>Overlocks:</label>
            {overlocks.map((value, index) => (
              <input
                key={index}
                name={`overlock${index}`}
                value={value}
                onChange={handleInputChange(index, setOverlocks)}
              />
            ))}
          </div>
          <div className="reverseOverlocks">
            <label>Reverse Overlocks:</label>
            {reverseOverlocks.map((value, index) => (
              <input
                key={index}
                name={`reverseOverlock${index}`}
                value={value}
                onChange={handleInputChange(index, setReverseOverlocks)}
              />
            ))}
          </div>
          <div className="cleaned">
            <label>Cleaned:</label>
            {cleans.map((value, index) => (
              <input
                key={index}
                name={`clean${index}`}
                value={value}
                onChange={handleInputChange(index, setCleans)}
              />
            ))}
          </div>
        </div>
        <div className="todoList">
          <label>Todo List:</label>
          {toDoList.map((value, index) => (
            <input
              key={index}
              name={`toDoList${index}`}
              value={value}
              onChange={handleInputChange(index, setToDoList)}
            />
          ))}
        </div>
        <div className="otherNotes">
          <label>Other Notes:</label>
          {otherNotes.map((value, index) => (
            <input
              key={index}
              name={`otherNotes${index}`}
              value={value}
              onChange={handleInputChange(index, setOtherNotes)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notes;

import { useState } from "react";
import DailyTasks from "../components/DailyTasks";
import Notes from "../components/Notes";
import PettyCash from "../components/DailyTasks";

const FormContainer = () => {
  // Tasks state
  const [tasks, setTasks] = useState([
    { label: "Task 1", checked: false },
    { label: "Task 2", checked: false },
    // Add more tasks here
  ]);

  // Notes state
  const [overlocks, setOverlocks] = useState(Array(15).fill(""));
  const [reverseOverlocks, setReverseOverlocks] = useState(Array(15).fill(""));
  const [cleans, setCleans] = useState(Array(15).fill(""));
  const [toDoList, setToDoList] = useState(Array(15).fill(""));
  const [otherNotes, setOtherNotes] = useState(Array(15).fill(""));

  //Petty Cash
  const [pennies, setPennies] = useState("");
  const [nickels, setNickels] = useState("");
  const [dimes, setDimes] = useState("");
  const [quarters, setQuarters] = useState("");
  const [ones, setOnes] = useState("");
  const [fives, setFives] = useState("");
  const [tens, setTens] = useState("");
  const [twenties, setTwenties] = useState("");
  const [fifties, setFifties] = useState("");
  const [hundreds, setHundreds] = useState("");
  const [currentTotal, setCurrentTotal] = useState("");
  const [receipts, setReceipts] = useState("");
  const [totalPettyCash, setTotalPettyCash] = useState("");

  const handleCheck = (index) => {
    console.log("handleCheck called with index:", index);
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send all data to backend...
  };

  return (
    <form onSubmit={handleSubmit}>
      <DailyTasks tasks={tasks} handleCheck={handleCheck} />
      <Notes
        overlocks={overlocks}
        setOverlocks={setOverlocks}
        reverseOverlocks={reverseOverlocks}
        setReverseOverlocks={setReverseOverlocks}
        cleans={cleans}
        setCleans={setCleans}
        toDoList={toDoList}
        setToDoList={setToDoList}
        otherNotes={otherNotes}
        setOtherNotes={setOtherNotes}
      />
      <PettyCash
        pennies={pennies}
        setPennies={setPennies}
        nickels={nickels}
        setNickels={setNickels}
        dimes={dimes}
        setDimes={setDimes}
        quarters={quarters}
        setQuarters={setQuarters}
        ones={ones}
        setOnes={setOnes}
        fives={fives}
        setFives={setFives}
        tens={tens}
        setTens={setTens}
        twenties={twenties}
        setTwenties={setTwenties}
        fifties={fifties}
        setFifties={setFifties}
        hundreds={hundreds}
        setHundreds={setHundreds}
        currentTotal={currentTotal}
        setCurrentTotal={setCurrentTotal}
        receipts={receipts}
        setReceipts={setReceipts}
        totalPettyCash={totalPettyCash}
        setTotalPettyCash={setTotalPettyCash}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormContainer;

import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import DailyTasks from "../components/DailyTasks";
import Notes from "../components/Notes";
import PettyCash from "../components/PettyCash";

const TasksList = () => {
  const { user, setMessages } = useOutletContext();
  console.log(user);
  // Active tab state
  const [isActive, setIsActive] = useState({
    tasksActive: true,
    notesActive: false,
    pettyActive: false,
  });

  // Tasks state
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [
      { label: "Clock in", checked: false },
      {
        label: "Open office/turn off alarm/post 'Open' sign in door",
        checked: false,
      },
      {
        label: "Log into store email, Sitelink, gate and camera systems",
        checked: false,
      },
      {
        label:
          "Count cash drawer. Complete Cash Count Worksheet (CO Blue Book)",
        checked: false,
      },
      {
        label:
          "Print Transaction Central Report for previous day and put away paperwork",
        checked: false,
      },
      { label: "Check and Respond to emails and voicemails", checked: false },
      { label: "Clean your Office and restock Merchandise", checked: false },
      {
        label: "Check gate system reports for any after hour issues",
        checked: false,
      },
      {
        label:
          "Review Reminders List - Process Past Due Notices, Invoices, Rent increases",
        checked: false,
      },
      {
        label: "Review all inquiries/reservations and update in Sitelink",
        checked: false,
      },
      {
        label:
          "Post any unposted payments from autopay run, Call tenant if it doesn’t process",
        checked: false,
      },
      {
        label:
          "Fill in site check section units to be overlocked, unlocked or cleaned",
        checked: false,
      },
      { label: "Check curb appeal and property cleanliness", checked: false },
      { label: "Conduct a complete walk-thru, lock check", checked: false },
      { label: "Complete goal section", checked: false },
      { label: "Clean and stock restrooms", checked: false },
      { label: "Print New Vacant Unit Sheet", checked: false },
      {
        label:
          "Check your website to make sure specials, pricing and site info is correct",
        checked: false,
      },
      {
        label:
          "Follow-up with Site check/lock check Issues (move outs, sweeping, etc.)",
        checked: false,
      },
      { label: "Complete Todo List", checked: false },
      { label: "Check emails through-out the day", checked: false },
      {
        label: "Make collection calls (Every other day per tenant due)",
        checked: false,
      },
      { label: "Clock out by 2pm for lunch", checked: false },
      { label: "Clean/refresh units", checked: false },
      {
        label: "Check property for cleanliness and maintenance needs",
        checked: false,
      },
      {
        label: "Work on on-going projects or Items assigned by DM",
        checked: false,
      },
      { label: "Process mail & post payments received", checked: false },
      {
        label:
          "Review Deposit(s) to match Sitelink, Take deposit(s) to the bank during business hours",
        checked: false,
      },
      {
        label:
          "Check new move in files, make sure info is correct and all paperwork is complete",
        checked: false,
      },
      { label: "Follow up with Inquiries", checked: false },
      { label: "Check for any overlock removals", checked: false },
      { label: "Complete lock and property check", checked: false },
      { label: "Restock retail and office supplies", checked: false },
      { label: "Empty office trash and wipe surface areas", checked: false },
      {
        label:
          "Count cash drawer. Complete Cash Count Worksheet (Print weekly, put in Daily Close binder)",
        checked: false,
      },
      {
        label:
          "Sitelink Daily Close, Print Deposit Report, and prepare bank deposit slip",
        checked: false,
      },
      { label: "Put away all your paperwork", checked: false },
      { label: "Clean office windows and close blinds", checked: false },
      { label: "Put Daily Checklist in Site Info Binder", checked: false },
      {
        label:
          "Clock out, turn on alarm, turn off 'open sign', turn off TVs, lock up office",
        checked: false,
      },
      // Add more tasks here
    ]
  );

  // Notes state
  const [overlocks, setOverlocks] = useState(
    JSON.parse(localStorage.getItem("overlocks")) || Array(15).fill("")
  );
  const [reverseOverlocks, setReverseOverlocks] = useState(
    JSON.parse(localStorage.getItem("reverseOverlocks")) || Array(15).fill("")
  );
  const [cleans, setCleans] = useState(
    JSON.parse(localStorage.getItem("cleans")) || Array(15).fill("")
  );
  const [toDoList, setToDoList] = useState(
    JSON.parse(localStorage.getItem("toDoList")) || Array(15).fill("")
  );
  const [otherNotes, setOtherNotes] = useState(
    JSON.parse(localStorage.getItem("otherNotes")) || Array(15).fill("")
  );

  // Petty Cash
  const [pennies, setPennies] = useState(
    JSON.parse(localStorage.getItem("pennies")) || ""
  );
  const [nickels, setNickels] = useState(
    JSON.parse(localStorage.getItem("nickels")) || ""
  );
  const [dimes, setDimes] = useState(
    JSON.parse(localStorage.getItem("dimes")) || ""
  );
  const [quarters, setQuarters] = useState(
    JSON.parse(localStorage.getItem("quarters")) || ""
  );
  const [ones, setOnes] = useState(
    JSON.parse(localStorage.getItem("ones")) || ""
  );
  const [fives, setFives] = useState(
    JSON.parse(localStorage.getItem("fives")) || ""
  );
  const [tens, setTens] = useState(
    JSON.parse(localStorage.getItem("tens")) || ""
  );
  const [twenties, setTwenties] = useState(
    JSON.parse(localStorage.getItem("twenties")) || ""
  );
  const [fifties, setFifties] = useState(
    JSON.parse(localStorage.getItem("fifties")) || ""
  );
  const [hundreds, setHundreds] = useState(
    JSON.parse(localStorage.getItem("hundreds")) || ""
  );
  const [currentTotal, setCurrentTotal] = useState(
    JSON.parse(localStorage.getItem("currentTotal")) || ""
  );
  const [receipts, setReceipts] = useState(
    JSON.parse(localStorage.getItem("receipts")) || ""
  );
  const [totalPettyCash, setTotalPettyCash] = useState(
    JSON.parse(localStorage.getItem("totalPettyCash")) || ""
  );

  const handleCheck = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleInputChange = (index, setter) => (event) => {
    setter((prev) => {
      const copy = [...prev];
      copy[index] = event.target.value;
      return copy;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Now you can send these arrays to the backend
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("overlocks", JSON.stringify(overlocks));
    localStorage.setItem("reverseOverlocks", JSON.stringify(reverseOverlocks));
    localStorage.setItem("cleans", JSON.stringify(cleans));
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
    localStorage.setItem("otherNotes", JSON.stringify(otherNotes));
    localStorage.setItem("pennies", JSON.stringify(pennies));
    localStorage.setItem("nickels", JSON.stringify(nickels));
    localStorage.setItem("dimes", JSON.stringify(dimes));
    localStorage.setItem("quarters", JSON.stringify(quarters));
    localStorage.setItem("ones", JSON.stringify(ones));
    localStorage.setItem("fives", JSON.stringify(fives));
    localStorage.setItem("tens", JSON.stringify(tens));
    localStorage.setItem("twenties", JSON.stringify(twenties));
    localStorage.setItem("fifties", JSON.stringify(fifties));
    localStorage.setItem("hundreds", JSON.stringify(hundreds));
    localStorage.setItem("currentTotal", JSON.stringify(currentTotal));
    localStorage.setItem("receipts", JSON.stringify(receipts));
    localStorage.setItem("totalPettyCash", JSON.stringify(totalPettyCash));
  }, [
    tasks,
    overlocks,
    reverseOverlocks,
    cleans,
    toDoList,
    otherNotes,
    pennies,
    nickels,
    dimes,
    quarters,
    ones,
    fives,
    tens,
    twenties,
    fifties,
    hundreds,
    currentTotal,
    receipts,
    totalPettyCash,
  ]);

  function changeTab(key) {
    setIsActive({
      tasksActive: key === "tasksActive",
      notesActive: key === "notesActive",
      pettyActive: key === "pettyActive",
    });
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="userInfo">
        <h3>Employee: {user.userName}</h3>
        <h3>Property: {user.property}</h3>
      </div>
      <div className="tabBtns">
        <button
          className="btn tasksBtn"
          onClick={() => changeTab("tasksActive")}
        >
          Daily Tasks
        </button>
        <button
          className="btn notesBtn"
          onClick={() => changeTab("notesActive")}
        >
          Notes
        </button>
        <button
          className="btn pettyBtn"
          onClick={() => changeTab("pettyActive")}
        >
          Petty Cash
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <button className="btn submitBtn" type="submit">
          Submit
        </button>
        {isActive.tasksActive && (
          <DailyTasks tasks={tasks} handleCheck={handleCheck} />
        )}
        {isActive.notesActive && (
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
        )}
        {isActive.pettyActive && (
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
        )}
      </form>
    </>
  );
};

export default TasksList;

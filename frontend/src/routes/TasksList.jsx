import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import DailyTasks from "../components/DailyTasks";
import Notes from "../components/Notes";
import PettyCash from "../components/PettyCash";
import SubmittingDataSpinner from "../components/SubmittingDataSpinner";

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
  const [tasks, setTasks] = useState([
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
      label: "Count cash drawer. Complete Cash Count Worksheet (CO Blue Book)",
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
  ]);

  // Notes state
  const [overlocks, setOverlocks] = useState(Array(15).fill(""));
  const [reverseOverlocks, setReverseOverlocks] = useState(Array(15).fill(""));
  const [cleans, setCleans] = useState(Array(15).fill(""));
  const [toDoList, setToDoList] = useState(Array(15).fill(""));
  const [otherNotes, setOtherNotes] = useState(Array(15).fill(""));

  // Petty Cash
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
  const [givenCash, setGivenCash] = useState(0);
  const [facilityName, setFacilityName] = useState(null);
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const facilityId = user ? user.property : null;
  console.log(facilityId);

  const handleCheck = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
    setIsDataSubmitted(false);
  };

  async function getFacilityName() {
    if (facilityId === null) {
      return; // Return early if facilityId is null
    }
    try {
      const response = await fetch(`/api/facilities/${facilityId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFacilityName(data.name);
      setGivenCash(data.givenCash);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function getEmptyTaskDB() {
    try {
      const response = await fetch(
        `/api/task/emptyTask?facilityId=${user.property}`
      );
      const data = await response.json();
      console.log(data);
      const findValue = (array, key, desiredKey) => {
        const foundObject = array.find((item) => item[key] === desiredKey);
        return foundObject ? foundObject.value : "";
      };
      // Update state with the fetched data
      setTasks(data.dailyTasks);
      setOverlocks(data.notes.overlock);
      setReverseOverlocks(data.notes.reverseOverlock);
      setCleans(data.notes.clean);
      setToDoList(data.notes.toDoList);
      setOtherNotes(data.notes.otherNotes);
      setPennies(
        findValue(data.pettyCash.denominations, "denomination", "pennies")
      );
      setNickels(
        findValue(data.pettyCash.denominations, "denomination", "nickels")
      );
      setDimes(
        findValue(data.pettyCash.denominations, "denomination", "dimes")
      );
      setQuarters(
        findValue(data.pettyCash.denominations, "denomination", "quarters")
      );
      setOnes(findValue(data.pettyCash.denominations, "denomination", "ones"));
      setFives(
        findValue(data.pettyCash.denominations, "denomination", "fives")
      );
      setTens(findValue(data.pettyCash.denominations, "denomination", "tens"));
      setTwenties(
        findValue(data.pettyCash.denominations, "denomination", "twenties")
      );
      setFifties(
        findValue(data.pettyCash.denominations, "denomination", "fifties")
      );
      setHundreds(
        findValue(data.pettyCash.denominations, "denomination", "hundreds")
      );
      setCurrentTotal(
        findValue(data.pettyCash.cashAmounts, "amount", "currentTotal")
      );
      setReceipts(findValue(data.pettyCash.cashAmounts, "amount", "receipts"));
      setTotalPettyCash(
        findValue(data.pettyCash.cashAmounts, "amount", "totalPettyCash")
      );
    } catch (error) {
      // Handle error
      console.error("Error retrieving empty tasks:", error);
    }
  }

  useEffect(() => {
    if (!user || !user.property) {
      console.error("User or user property is undefined");
      return; // Exit the effect if user data is not available yet
    }
    getEmptyTaskDB();
  }, [user]);

  // useEffect(() => {
  //   // Check if user is defined and has property
  //   if (!user || !user.property) {
  //     console.error("User or user property is undefined");
  //     return; // Exit the effect if user data is not available yet
  //   }

  //   // const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  //   const now = new Date();
  //   const offset = now.getTimezoneOffset() + 420; // Adjust for MST
  //   now.setMinutes(now.getMinutes() - offset);
  //   const today = now.toISOString().split("T")[0];

  //   if (lastVisit !== today) {
  //     // This is the user's first visit of the day, so fetch data from the server
  //     getEmptyTaskDB();
  //     // Update the last visit date
  //     setLastVisit(today);
  //     localStorage.setItem("lastVisit", today);
  //   } else {
  //     // The user has already visited today, so load data from localStorage
  //     setTasks(
  //       JSON.parse(localStorage.getItem("tasks")) || [
  //         { label: "Clock in", checked: false },
  //         {
  //           label: "Open office/turn off alarm/post 'Open' sign in door",
  //           checked: false,
  //         },
  //         {
  //           label: "Log into store email, Sitelink, gate and camera systems",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Count cash drawer. Complete Cash Count Worksheet (CO Blue Book)",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Print Transaction Central Report for previous day and put away paperwork",
  //           checked: false,
  //         },
  //         {
  //           label: "Check and Respond to emails and voicemails",
  //           checked: false,
  //         },
  //         {
  //           label: "Clean your Office and restock Merchandise",
  //           checked: false,
  //         },
  //         {
  //           label: "Check gate system reports for any after hour issues",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Review Reminders List - Process Past Due Notices, Invoices, Rent increases",
  //           checked: false,
  //         },
  //         {
  //           label: "Review all inquiries/reservations and update in Sitelink",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Post any unposted payments from autopay run, Call tenant if it doesn’t process",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Fill in site check section units to be overlocked, unlocked or cleaned",
  //           checked: false,
  //         },
  //         {
  //           label: "Check curb appeal and property cleanliness",
  //           checked: false,
  //         },
  //         { label: "Conduct a complete walk-thru, lock check", checked: false },
  //         { label: "Complete goal section", checked: false },
  //         { label: "Clean and stock restrooms", checked: false },
  //         { label: "Print New Vacant Unit Sheet", checked: false },
  //         {
  //           label:
  //             "Check your website to make sure specials, pricing and site info is correct",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Follow-up with Site check/lock check Issues (move outs, sweeping, etc.)",
  //           checked: false,
  //         },
  //         { label: "Complete Todo List", checked: false },
  //         { label: "Check emails through-out the day", checked: false },
  //         {
  //           label: "Make collection calls (Every other day per tenant due)",
  //           checked: false,
  //         },
  //         { label: "Clock out by 2pm for lunch", checked: false },
  //         { label: "Clean/refresh units", checked: false },
  //         {
  //           label: "Check property for cleanliness and maintenance needs",
  //           checked: false,
  //         },
  //         {
  //           label: "Work on on-going projects or Items assigned by DM",
  //           checked: false,
  //         },
  //         { label: "Process mail & post payments received", checked: false },
  //         {
  //           label:
  //             "Review Deposit(s) to match Sitelink, Take deposit(s) to the bank during business hours",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Check new move in files, make sure info is correct and all paperwork is complete",
  //           checked: false,
  //         },
  //         { label: "Follow up with Inquiries", checked: false },
  //         { label: "Check for any overlock removals", checked: false },
  //         { label: "Complete lock and property check", checked: false },
  //         { label: "Restock retail and office supplies", checked: false },
  //         {
  //           label: "Empty office trash and wipe surface areas",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Count cash drawer. Complete Cash Count Worksheet (Print weekly, put in Daily Close binder)",
  //           checked: false,
  //         },
  //         {
  //           label:
  //             "Sitelink Daily Close, Print Deposit Report, and prepare bank deposit slip",
  //           checked: false,
  //         },
  //         { label: "Put away all your paperwork", checked: false },
  //         { label: "Clean office windows and close blinds", checked: false },
  //         { label: "Put Daily Checklist in Site Info Binder", checked: false },
  //         {
  //           label:
  //             "Clock out, turn on alarm, turn off 'open sign', turn off TVs, lock up office",
  //           checked: false,
  //         },
  //         // Add more tasks here
  //       ]
  //     );
  //     // And similarly for other state variables
  //     setOverlocks(
  //       JSON.parse(localStorage.getItem("overlocks")) || Array(15).fill("")
  //     );
  //     setReverseOverlocks(
  //       JSON.parse(localStorage.getItem("reverseOverlocks")) ||
  //         Array(15).fill("")
  //     );
  //     setCleans(
  //       JSON.parse(localStorage.getItem("cleans")) || Array(15).fill("")
  //     );
  //     setToDoList(
  //       JSON.parse(localStorage.getItem("toDoList")) || Array(15).fill("")
  //     );
  //     setOtherNotes(
  //       JSON.parse(localStorage.getItem("otherNotes")) || Array(15).fill("")
  //     );
  //     setPennies(JSON.parse(localStorage.getItem("pennies")) || "");
  //     setNickels(JSON.parse(localStorage.getItem("nickels")) || "");
  //     setDimes(JSON.parse(localStorage.getItem("dimes")) || "");
  //     setQuarters(JSON.parse(localStorage.getItem("quarters")) || "");
  //     setOnes(JSON.parse(localStorage.getItem("ones")) || "");
  //     setFives(JSON.parse(localStorage.getItem("fives")) || "");
  //     setTens(JSON.parse(localStorage.getItem("tens")) || "");
  //     setTwenties(JSON.parse(localStorage.getItem("twenties")) || "");
  //     setFifties(JSON.parse(localStorage.getItem("fifties")) || "");
  //     setHundreds(JSON.parse(localStorage.getItem("hundreds")) || "");
  //     setCurrentTotal(JSON.parse(localStorage.getItem("currentTotal")) || "");
  //     setReceipts(JSON.parse(localStorage.getItem("receipts")) || "");
  //     setTotalPettyCash(
  //       JSON.parse(localStorage.getItem("totalPettyCash")) || ""
  //     );
  //     setGivenCash(JSON.parse(localStorage.getItem("givenCash")) || "");
  //     setFacilityName(JSON.parse(localStorage.getItem("facilityName")) || "");
  //   }
  // }, [user]);

  useEffect(() => {
    getFacilityName();
  }, [facilityId]);

  // useEffect for dealing with tasks related localStorage
  // useEffect(() => {
  //   console.log("stored");
  //   localStorage.setItem("tasks", JSON.stringify(tasks));
  //   localStorage.setItem("overlocks", JSON.stringify(overlocks));
  //   localStorage.setItem("reverseOverlocks", JSON.stringify(reverseOverlocks));
  //   localStorage.setItem("cleans", JSON.stringify(cleans));
  //   localStorage.setItem("toDoList", JSON.stringify(toDoList));
  //   localStorage.setItem("otherNotes", JSON.stringify(otherNotes));
  //   setIsDataSubmitted(false);
  // }, [tasks, overlocks, reverseOverlocks, cleans, toDoList, otherNotes]);

  // useEffect for dealing with cash related localStorage
  // useEffect(() => {
  //   localStorage.setItem("pennies", JSON.stringify(pennies));
  //   localStorage.setItem("nickels", JSON.stringify(nickels));
  //   localStorage.setItem("dimes", JSON.stringify(dimes));
  //   localStorage.setItem("quarters", JSON.stringify(quarters));
  //   localStorage.setItem("ones", JSON.stringify(ones));
  //   localStorage.setItem("fives", JSON.stringify(fives));
  //   localStorage.setItem("tens", JSON.stringify(tens));
  //   localStorage.setItem("twenties", JSON.stringify(twenties));
  //   localStorage.setItem("fifties", JSON.stringify(fifties));
  //   localStorage.setItem("hundreds", JSON.stringify(hundreds));
  //   localStorage.setItem("currentTotal", JSON.stringify(currentTotal));
  //   localStorage.setItem("receipts", JSON.stringify(receipts));
  //   localStorage.setItem("totalPettyCash", JSON.stringify(totalPettyCash));
  //   localStorage.setItem("givenCash", JSON.stringify(givenCash));
  //   setIsDataSubmitted(false);
  // }, [
  //   pennies,
  //   nickels,
  //   dimes,
  //   quarters,
  //   ones,
  //   fives,
  //   tens,
  //   twenties,
  //   fifties,
  //   hundreds,
  //   currentTotal,
  //   receipts,
  //   totalPettyCash,
  //   givenCash,
  // ]);

  // Prompts user to save data if not submiited
  useEffect(() => {
    const beforeUnloadEvent = (event) => {
      if (!isDataSubmitted) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes, are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", beforeUnloadEvent);

    // Don't forget to clean up the event listener
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadEvent);
    };
  }, [isDataSubmitted]); // Re-run the effect when `isDataSubmitted` changes

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

  async function handleUpdateTask(event) {
    event.preventDefault();
    setIsLoadingSubmit(true);
    const form = event.currentTarget;
    const data = {
      facilityId: user.property,
      notes: {
        overlock: overlocks,
        reverseOverlock: reverseOverlocks,
        clean: cleans,
        toDoList: toDoList,
        otherNotes: otherNotes,
      },
      dailyTasks: tasks,
      pettyCash: {
        denominations: [
          { denomination: "pennies", value: pennies },
          { denomination: "nickels", value: nickels },
          { denomination: "dimes", value: dimes },
          { denomination: "quarters", value: quarters },
          { denomination: "ones", value: ones },
          { denomination: "fives", value: fives },
          { denomination: "tens", value: tens },
          { denomination: "twenties", value: twenties },
          { denomination: "fifties", value: fifties },
          { denomination: "hundreds", value: hundreds },
        ],
        cashAmounts: [
          { amount: "receipts", value: receipts },
          { amount: "currentTotal", value: currentTotal },
          { amount: "totalPettyCash", value: totalPettyCash },
          { amount: "givenCash", value: givenCash },
        ],
      },
      user: user._id, // assuming user object has an _id field
    };

    console.log(data);

    const response = await fetch(form.action, {
      method: form.method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (json.messages) {
      setMessages(json.messages);
    }
    setIsLoadingSubmit(false);
    setIsDataSubmitted(true);
  }

  return (
    <>
      <div className="userInfo">
        {/* {user.isAdmin && (
          <Link to="/admin" className="col-3 btn btn-primary">
            Admin
          </Link>
        )}
        <Link to="/pastTasks" className="col-3 btn btn-primary">
          {facilityName}'s Past Tasks
        </Link> */}
        <h3>Employee: {user.userName}</h3>
        <h3>Property: {facilityName}</h3>
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
      <form
        action="/api/task/updateTask?_method=PUT"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleUpdateTask}
      >
        <button className="btn submitBtn" type="submit">
          Submit
        </button>
        {isLoadingSubmit && <SubmittingDataSpinner />}
        {isDataSubmitted && (
          <h2 className="submittedDataMsg">Task data submitted!</h2>
        )}
        {isActive.tasksActive && (
          <DailyTasks
            tasks={tasks}
            handleCheck={handleCheck}
            readOnly={false}
          />
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
            readOnly={false}
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
            givenCash={givenCash}
            readOnly={false}
          />
        )}
      </form>
    </>
  );
};

export default TasksList;

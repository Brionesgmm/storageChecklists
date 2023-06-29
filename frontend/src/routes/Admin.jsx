import { React, useState, useEffect } from "react";
import { useOutletContext, Outlet } from "react-router-dom";
import DailyTasks from "../components/DailyTasks";
import Notes from "../components/Notes";
import PettyCash from "../components/PettyCash";

const Admin = () => {
  const { user, setMessages } = useOutletContext();
  const [properties, setProperties] = useState([]);
  const [isUserAdmin, setIsUserAdmin] = useState(
    JSON.parse(localStorage.getItem("isAdmin") || false)
  );
  const [selectedProperty, setSelectedProperty] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [overlocks, setOverlocks] = useState(Array(15).fill(""));
  const [reverseOverlocks, setReverseOverlocks] = useState(Array(15).fill(""));
  const [cleans, setCleans] = useState(Array(15).fill(""));
  const [toDoList, setToDoList] = useState(Array(15).fill(""));
  const [otherNotes, setOtherNotes] = useState(Array(15).fill(""));
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
  const [givenCash, setGivenCash] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [taskFillerId, setTaskFillerId] = useState("");
  const [taskFillerName, setTaskFillerName] = useState("");
  const [isActive, setIsActive] = useState({
    tasksActive: true,
    notesActive: false,
    pettyActive: false,
  });
  console.log(isUserAdmin);
  console.log(user);

  // if (!isUserAdmin) {
  //   return <h1>You don't have access to this page.</h1>;
  // }

  // get list of facilities
  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch("/api/facilities");
      const data = await response.json();
      console.log(data);
      setProperties(data);
    };
    fetchProperties();
  }, []);

  //get filled out form user
  useEffect(() => {
    const fetchFillerName = async () => {
      const response = await fetch(`/api/formUserInfo/${taskFillerId}`);
      const data = await response.json();
      console.log(data);
      console.log(data.userName);
      setTaskFillerName(data.userName);
    };
    if (taskFillerId) {
      fetchFillerName();
    } else {
      setTaskFillerName("");
    }
  }, [taskFillerId]);

  // store isAdmin for user
  useEffect(() => {
    if (user) {
      console.log("stored");
      localStorage.setItem("isAdmin", JSON.stringify(user.isAdmin));
    }
  }, [user]);

  async function getTaskData() {
    console.log(selectedDate);
    const url = `/api/task/facilityTask?facilityId=${selectedProperty}&date=${selectedDate}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    if (data && data.notes) {
      const findValue = (array, key, desiredKey) => {
        const foundObject = array.find((item) => item[key] === desiredKey);
        return foundObject ? foundObject.value : "";
      };
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
      setTaskFillerId(data.user);
      console.log(taskFillerId);
      setErrorMessage("");
    } else {
      setErrorMessage(data.message);
    }
  }

  function changeTab(key) {
    setIsActive({
      tasksActive: key === "tasksActive",
      notesActive: key === "notesActive",
      pettyActive: key === "pettyActive",
    });
  }

  return (
    <>
      <div className="mb-3">
        <label htmlFor="property" className="form-label">
          Property
        </label>
        <select
          className="form-select"
          id="property"
          name="property"
          onChange={(e) => setSelectedProperty(e.target.value)}
        >
          <option value="">Select a property</option>
          {properties.map((property) => (
            <option value={property._id} key={property._id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date
        </label>
        <input
          type="date"
          className="form-control"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <button onClick={getTaskData}>Find Task</button>
      {errorMessage && <h2>{errorMessage}</h2>}
      {!errorMessage && (
        <div className="pastDataDisplay">
          <h2>Daily tasks filled by: {taskFillerName}</h2>
          {
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
          }
          {
            <div>
              {isActive.tasksActive && (
                <DailyTasks tasks={tasks} readOnly={true} />
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
                  readOnly={true}
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
                  readOnly={true}
                />
              )}
            </div>
          }
        </div>
      )}
      {!isUserAdmin && <h1>You don't have access to this page.</h1>}
      <Outlet />
    </>
  );
};

export default Admin;

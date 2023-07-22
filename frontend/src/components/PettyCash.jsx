import React, { useEffect, useState } from "react";

const PettyCash = ({
  pennies,
  setPennies,
  nickels,
  setNickels,
  dimes,
  setDimes,
  quarters,
  setQuarters,
  ones,
  setOnes,
  fives,
  setFives,
  tens,
  setTens,
  twenties,
  setTwenties,
  fifties,
  setFifties,
  hundreds,
  setHundreds,
  currentTotal,
  setCurrentTotal,
  receipts,
  setReceipts,
  totalPettyCash,
  setTotalPettyCash,
  givenCash,
  readOnly,
}) => {
  const [prevDenominations, setPrevDenominations] = useState({
    pennies: pennies || "",
    nickels: nickels || "",
    dimes: dimes || "",
    quarters: quarters || "",
    ones: ones || "",
    fives: fives || "",
    tens: tens || "",
    twenties: twenties || "",
    fifties: fifties || "",
    hundreds: hundreds || "",
  });
  console.log(currentTotal, "pettyCash");
  const handleCurrentTotalChange = (value) => {
    const allZeroDenominations = Object.values(prevDenominations).every(
      (denomination) => denomination === 0 || denomination === ""
    );

    if (allZeroDenominations) {
      setCurrentTotal(Number(value));
    }
  };

  useEffect(() => {
    // Calculate total from denominations, regardless of their values
    let newCurrentTotal =
      Number(pennies) * 0.01 +
      Number(nickels) * 0.05 +
      Number(dimes) * 0.1 +
      Number(quarters) * 0.25 +
      Number(ones) * 1 +
      Number(fives) * 5 +
      Number(tens) * 10 +
      Number(twenties) * 20 +
      Number(fifties) * 50 +
      Number(hundreds) * 100;

    // If the denominations total is 0, use currentTotal from the database
    if (newCurrentTotal === 0) {
      newCurrentTotal = Number(currentTotal);
    }

    const denominationsChanged =
      pennies !== prevDenominations.pennies ||
      nickels !== prevDenominations.nickels ||
      dimes !== prevDenominations.dimes ||
      quarters !== prevDenominations.quarters ||
      ones !== prevDenominations.ones ||
      fives !== prevDenominations.fives ||
      tens !== prevDenominations.tens ||
      twenties !== prevDenominations.twenties ||
      fifties !== prevDenominations.fifties ||
      hundreds !== prevDenominations.hundreds;

    if (denominationsChanged) {
      setCurrentTotal(newCurrentTotal.toFixed(2));
      setPrevDenominations({
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
      });
    }

    const numCurrentTotal = Number(currentTotal) || 0;
    const numReceipts = Number(receipts) || 0;
    const newTotalPettyCash = numCurrentTotal + numReceipts;
    setTotalPettyCash(newTotalPettyCash.toFixed(2));
  }, [
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
    receipts,
    prevDenominations,
    currentTotal,
  ]);

  return (
    <div className="pettyCashTab">
      <h2 className="pettyCashTitle">Petty Cash</h2>
      <div className="pettyCash">
        {/* Denominations */}
        <div className="cashInputs">
          <label htmlFor="pennies">Pennies: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="pennies"
            id="pennies"
            value={pennies ? pennies : ""}
            onChange={(e) => setPennies(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="nickels">Nickels: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="nickels"
            id="nickels"
            value={nickels ? nickels : ""}
            onChange={(e) => setNickels(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="dimes">Dimes: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="dimes"
            id="dimes"
            value={dimes ? dimes : ""}
            onChange={(e) => setDimes(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="quarters">Quarters:</label>
          <input
            readOnly={readOnly}
            type="number"
            name="quarters"
            id="quarters"
            value={quarters ? quarters : ""}
            onChange={(e) => setQuarters(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="ones">Ones:</label>
          <input
            readOnly={readOnly}
            type="number"
            name="ones"
            id="ones"
            value={ones ? ones : ""}
            onChange={(e) => setOnes(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="fives">Fives:</label>
          <input
            readOnly={readOnly}
            type="number"
            name="fives"
            id="fives"
            value={fives ? fives : ""}
            onChange={(e) => setFives(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="tens">Tens:</label>
          <input
            readOnly={readOnly}
            type="number"
            name="tens"
            id="tens"
            value={tens ? tens : ""}
            onChange={(e) => setTens(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="twenties">Twenties:</label>
          <input
            readOnly={readOnly}
            type="number"
            name="twenties"
            id="twenties"
            value={twenties ? twenties : ""}
            onChange={(e) => setTwenties(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="fifties">Fifties: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="fifties"
            id="fifties"
            value={fifties ? fifties : ""}
            onChange={(e) => setFifties(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="hundreds">Hundreds: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="hundreds"
            id="hundreds"
            value={hundreds ? hundreds : ""}
            onChange={(e) => setHundreds(e.target.value)}
          />
        </div>

        {/* Receipts */}
        <div className="cashInputs">
          <label htmlFor="receipts">Receipts: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="receipts"
            id="receipts"
            value={receipts ? receipts : ""}
            onChange={(e) => setReceipts(e.target.value)}
          />
        </div>

        {/* Current total */}
        <div className="cashInputs">
          <label htmlFor="currentTotal">Current Cash: </label>
          <input
            readOnly={readOnly}
            type="number"
            name="currentTotal"
            id="currentTotal"
            value={currentTotal ? currentTotal : ""}
            onChange={(e) => handleCurrentTotalChange(e.target.value)}
          />
        </div>

        {/* Total Petty Cash */}
        <div className="cashInputs">
          <label htmlFor="totalPettyCash">Total Petty Cash: </label>
          <input
            type="number"
            name="totalPettyCash"
            id="totalPettyCash"
            value={totalPettyCash ? totalPettyCash : ""}
            readOnly
          />
        </div>

        {/* Given Cash */}
        <div className="cashInputs">
          <label htmlFor="givenCash">Given Cash: </label>
          <input
            type="number"
            name="givenCash"
            id="givenCash"
            value={givenCash ? givenCash : ""}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PettyCash;

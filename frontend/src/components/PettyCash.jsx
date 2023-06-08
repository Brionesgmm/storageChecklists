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
}) => {
  const [prevDenominations, setPrevDenominations] = useState({
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

  const handleCurrentTotalChange = (value) => {
    const allZeroDenominations = Object.values(prevDenominations).every(
      (denomination) => denomination === 0 || denomination === ""
    );

    if (allZeroDenominations) {
      setCurrentTotal(Number(value));
    }
  };
  useEffect(() => {
    const newCurrentTotal =
      pennies * 0.01 +
      nickels * 0.05 +
      dimes * 0.1 +
      quarters * 0.25 +
      ones * 1 +
      fives * 5 +
      tens * 10 +
      twenties * 20 +
      fifties * 50 +
      hundreds * 100;

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
            type="number"
            name="pennies"
            id="pennies"
            value={pennies}
            onChange={(e) => setPennies(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="nickels">Nickels: </label>
          <input
            type="number"
            name="nickels"
            id="nickels"
            value={nickels}
            onChange={(e) => setNickels(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="dimes">Dimes: </label>
          <input
            type="number"
            name="dimes"
            id="dimes"
            value={dimes}
            onChange={(e) => setDimes(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="quarters">Quarters:</label>
          <input
            type="number"
            name="quarters"
            id="quarters"
            value={quarters}
            onChange={(e) => setQuarters(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="ones">Ones:</label>
          <input
            type="number"
            name="ones"
            id="ones"
            value={ones}
            onChange={(e) => setOnes(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="fives">Fives:</label>
          <input
            type="number"
            name="fives"
            id="fives"
            value={fives}
            onChange={(e) => setFives(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="tens">Tens:</label>
          <input
            type="number"
            name="tens"
            id="tens"
            value={tens}
            onChange={(e) => setTens(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="twenties">Twenties:</label>
          <input
            type="number"
            name="twenties"
            id="twenties"
            value={twenties}
            onChange={(e) => setTwenties(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="fifties">Fifties: </label>
          <input
            type="number"
            name="fifties"
            id="fifties"
            value={fifties}
            onChange={(e) => setFifties(e.target.value)}
          />
        </div>

        <div className="cashInputs">
          <label htmlFor="hundreds">Hundreds: </label>
          <input
            type="number"
            name="hundreds"
            id="hundreds"
            value={hundreds}
            onChange={(e) => setHundreds(e.target.value)}
          />
        </div>

        {/* Receipts */}
        <div className="cashInputs">
          <label htmlFor="receipts">Receipts: </label>
          <input
            type="number"
            name="receipts"
            id="receipts"
            value={receipts}
            onChange={(e) => setReceipts(e.target.value)}
          />
        </div>

        {/* Current total */}
        <div className="cashInputs">
          <label htmlFor="currentTotal">Current Cash: </label>
          <input
            type="number"
            name="currentTotal"
            id="currentTotal"
            value={currentTotal}
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
            value={totalPettyCash}
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
            value={givenCash}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default PettyCash;

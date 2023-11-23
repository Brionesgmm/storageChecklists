import React, { useState } from "react";

const CurrentAuctions = ({
  setIsDataSubmitted,
  setIsMakingChanges,
  setCurrentAuctions,
  currentAuctions,
  isDataSubmitted,
}) => {
  const [newUnits, setNewUnits] = useState({});
  const [hasChanged, setHasChanged] = useState(false); // New state to track if changes have been made

  const markAsChanged = () => {
    if (!hasChanged) {
      setHasChanged(true);
    }
    setIsDataSubmitted(false);
    setIsMakingChanges(true);
  };

  const handleChange = (index, field, event) => {
    setIsDataSubmitted(false);
    setIsMakingChanges(true);
    markAsChanged();
    setCurrentAuctions((prevAuctions) => {
      const newAuctions = [...prevAuctions];
      const fields = field.split("."); // split the field string into an array based on the dot character
      if (fields.length === 2) {
        // if the field string was split into two parts
        // handle nested fields
        newAuctions[index][fields[0]] = {
          ...newAuctions[index][fields[0]],
          [fields[1]]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
        };
      } else {
        // handle non-nested fields
        newAuctions[index][field] = event.target.value;
      }
      return newAuctions;
    });
    console.log(currentAuctions);
  };

  const addNewAuction = () => {
    setCurrentAuctions((prevAuctions) => {
      const newAuctions = [...prevAuctions];
      newAuctions.push({
        lockCutDate: { time: "", completed: false },
        lienDate: { time: "", completed: false },
        firstAdDate: { time: "", completed: false },
        secondAdDate: { time: "", completed: false },
        auctionStart: { time: "", completed: false },
        auctionEnd: { time: "", completed: false },
        auctionUnits: [],
        auctionFinished: false,
        id: `${Date.now()}`,
      });
      return newAuctions;
    });
  };

  const handleDeleteAuction = (auctionId, auctionDate) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${new Date(
        auctionDate
      ).toLocaleDateString()} auction?`
    );
    if (confirmation) {
      setIsMakingChanges(true);
      setCurrentAuctions((prevAuctions) => {
        return prevAuctions.filter((auction) => auction.id !== auctionId);
      });
      setIsDataSubmitted(false);
    }
  };

  const addUnit = (index) => {
    const unitToAdd = newUnits[index];
    if (unitToAdd) {
      setCurrentAuctions((prevAuctions) => {
        const newAuctions = [...prevAuctions];
        newAuctions[index].auctionUnits.push({
          unit: unitToAdd,
          id: `${Date.now()}`,
        });
        return newAuctions;
      });
      // Clear the input field after adding the unit
      setNewUnits((prev) => ({
        ...prev,
        [index]: "",
      }));
      setIsMakingChanges(true);
      setIsDataSubmitted(false);
      markAsChanged();
    }
  };

  const handleDeleteUnit = (auctionIndex, unitId) => {
    setIsMakingChanges(true);
    setIsDataSubmitted(false);
    setCurrentAuctions((prevAuctions) => {
      const newAuctions = [...prevAuctions];
      newAuctions[auctionIndex].auctionUnits = newAuctions[
        auctionIndex
      ].auctionUnits.filter((unit) => unit.id !== unitId);
      return newAuctions;
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const reformatDate = (dateString) => {
    console.log(dateString);
    // Check if dateString is valid
    if (!dateString || isNaN(Date.parse(dateString))) {
      return "";
    }

    if (dateString.includes("T00:00:00.000Z")) {
      let correctedDate = dateString.replace(/T00:00:00.000Z/, "");
      const [year, month, day] = correctedDate.split("-");

      // Return the date in the desired format
      return `${month}/${day}/${year}`;
    } else {
      // Split the string into parts
      const [year, month, day] = dateString.split("-");

      // Return the date in the desired format
      return `${month}/${day}/${year}`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) {
      return "";
    }
    const date = new Date(dateString);

    console.log(date);
    console.log(date.toISOString().substring(0, 10));
    return date.toISOString().substring(0, 10);
  };

  const currentAuctionsElement = (
    <div
      className={`currentAuctionsSection ${
        hasChanged
          ? isDataSubmitted
            ? "dataSubmitted"
            : "dataNotSubmitted"
          : ""
      }`}
    >
      <h1>Current Auctions</h1>
      <div className="currentAuctions">
        {currentAuctions.length === 0 ? (
          <div>No Auctions</div>
        ) : (
          currentAuctions.filter(el => !el.auctionFinished).map((auction, index) => (
            <div className="liveAuctions" key={auction.id}>
              {console.log(auction.auctionEnd.time)}
              <div className="auctionInfo">
                <h2 className="auctionTitle">
                  {auction.auctionEnd.time
                    ? reformatDate(auction.auctionEnd.time)
                    : ""}
                </h2>
                <div className="auctionInputs">
                  <div className="inputsSections">
                    <label htmlFor={`lockCutDate-${index}`}>Lock Cut</label>
                    <input
                      id={`lockCutDate-${index}`}
                      type="date"
                      value={formatDate(auction.lockCutDate.time) || ""}
                      onChange={(e) =>
                        handleChange(index, "lockCutDate.time", e)
                      }
                      onKeyDown={handleKeyPress}
                    />
                    {/* <label htmlFor={`lockCutDateCompleted-${index}`}>
                      Completed
                    </label> */}
                    <input
                      type="checkbox"
                      id={`lockCutDateCompleted-${index}`}
                      checked={auction.lockCutDate.completed || false}
                      onChange={(e) =>
                        handleChange(index, "lockCutDate.completed", e)
                      }
                    />
                  </div>
                  <div className="inputsSections">
                    <label htmlFor={`lienDate-${index}`}>Lien</label>
                    <input
                      id={`lienDate-${index}`}
                      type="date"
                      value={formatDate(auction.lienDate.time) || ""}
                      onChange={(e) => handleChange(index, "lienDate.time", e)}
                      onKeyDown={handleKeyPress}
                    />
                    {/* <label htmlFor={`lienDateCompleted-${index}`}>
                      Completed
                    </label> */}
                    <input
                      type="checkbox"
                      id={`lienDateCompleted-${index}`}
                      checked={auction.lienDate.completed || false}
                      onChange={(e) =>
                        handleChange(index, "lienDate.completed", e)
                      }
                    />
                  </div>
                  <div className="inputsSections">
                    <label htmlFor={`firstAdDate-${index}`}>First Ad</label>
                    <input
                      id={`firstAdDate-${index}`}
                      type="date"
                      value={formatDate(auction.firstAdDate.time) || ""}
                      onChange={(e) =>
                        handleChange(index, "firstAdDate.time", e)
                      }
                      onKeyDown={handleKeyPress}
                    />
                    {/* <label htmlFor={`firstAdDateCompleted-${index}`}>
                      Completed
                    </label> */}
                    <input
                      type="checkbox"
                      id={`firstAdDateCompleted-${index}`}
                      checked={auction.firstAdDate.completed || false}
                      onChange={(e) =>
                        handleChange(index, "firstAdDate.completed", e)
                      }
                    />
                  </div>
                  <div className="inputsSections">
                    <label htmlFor={`secondAdDate-${index}`}>Second Ad</label>
                    <input
                      id={`secondAdDate-${index}`}
                      type="date"
                      value={formatDate(auction.secondAdDate.time) || ""}
                      onChange={(e) =>
                        handleChange(index, "secondAdDate.time", e)
                      }
                      onKeyDown={handleKeyPress}
                    />
                    {/* <label htmlFor={`secondAdDateCompleted-${index}`}>
                      Completed
                    </label> */}
                    <input
                      type="checkbox"
                      id={`secondAdDateCompleted-${index}`}
                      checked={auction.secondAdDate.completed || false}
                      onChange={(e) =>
                        handleChange(index, "secondAdDate.completed", e)
                      }
                    />
                  </div>
                  <div className="inputsSections">
                    <label htmlFor={`auctionStart-${index}`}>
                      Auction Start
                    </label>
                    <input
                      id={`auctionStart-${index}`}
                      type="date"
                      value={formatDate(auction.auctionStart.time) || ""}
                      onChange={(e) =>
                        handleChange(index, "auctionStart.time", e)
                      }
                      onKeyDown={handleKeyPress}
                    />
                    {/* <label htmlFor={`auctionStartCompleted-${index}`}>
                      Completed
                    </label> */}
                    <input
                      type="checkbox"
                      id={`auctionStartCompleted-${index}`}
                      checked={auction.auctionStart.completed || false}
                      onChange={(e) =>
                        handleChange(index, "auctionStart.completed", e)
                      }
                    />
                  </div>
                  <div className="inputsSections">
                    <label htmlFor={`auctionEnd-${index}`}>Auction End</label>
                    <input
                      id={`auctionEnd-${index}`}
                      type="date"
                      value={formatDate(auction.auctionEnd.time) || ""}
                      onChange={(e) =>
                        handleChange(index, "auctionEnd.time", e)
                      }
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <div className="auctionUnits">
                    <p>Auction Units</p>
                    <p>Total Units {auction.auctionUnits.length}</p>
                    {auction.auctionUnits.map((unit) => (
                      <div className="units" key={unit.id}>
                        {unit.unit}
                        <button
                          className="unitDeleteBtn"
                          type="button"
                          onClick={() => handleDeleteUnit(index, unit.id)}
                        >
                          Delete 🗑️
                        </button>
                      </div>
                    ))}
                    <input
                      type="text"
                      value={newUnits[index] || ""}
                      onChange={(e) =>
                        setNewUnits({
                          ...newUnits,
                          [index]: e.target.value,
                        })
                      }
                      placeholder="Add Unit"
                      onKeyDown={handleKeyPress}
                    />

                    <button
                      type="button"
                      className="addUnitBtn"
                      onClick={() => addUnit(index)}
                    >
                      Add Unit
                    </button>
                  </div>
                  <div className="inputsSections">
                    <label>
                      Auction Finished:
                      <input
                        type="checkbox"
                        checked={auction.auctionFinished || false}
                        onChange={(e) =>
                          handleChange(index, "auctionFinished", {
                            target: { value: e.target.checked },
                          })
                        }
                        onKeyDown={handleKeyPress}
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className="auctionDeleteBtn"
                    onClick={() =>
                      handleDeleteAuction(auction.id, auction.auctionEnd.time)
                    }
                  >
                    Delete Auction🗑️
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <button type="button" onClick={addNewAuction}>
        Add New Auction
      </button>
    </div>
  );

  return <div>{currentAuctionsElement}</div>;
};

export default CurrentAuctions;

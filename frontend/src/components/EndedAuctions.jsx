import React, { useState } from "react";

const EndedAuctions = ({
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

  const handleChange = (auctionId, field, event) => {
    setIsDataSubmitted(false);
    setIsMakingChanges(true);
    markAsChanged();
    setCurrentAuctions((prevAuctions) => {
      const newAuctions = [...prevAuctions];
      const auctionIndex = newAuctions.findIndex(
        (auction) => auction.id === auctionId
      );
      const fields = field.split("."); // split the field string into an array based on the dot character

      if (fields.length === 2) {
        // handle nested fields
        newAuctions[auctionIndex][fields[0]] = {
          ...newAuctions[auctionIndex][fields[0]],
          [fields[1]]:
            event.target.type === "checkbox"
              ? event.target.checked
              : event.target.value,
        };
      } else {
        // handle non-nested fields
        newAuctions[auctionIndex][field] = event.target.value;
      }
      return newAuctions;
    });
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
      <h1>Ended Auctions</h1>
      <div className="currentAuctions">
        {currentAuctions.length === 0 ? (
          <div>No Auctions</div>
        ) : (
          currentAuctions
            .filter((el) => el.auctionFinished)
            .map((auction, index) => (
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
                      <label htmlFor={`lockCutDate-${auction.id}`}>
                        Lock Cut
                      </label>
                      <input
                        id={`lockCutDate-${auction.id}`}
                        type="date"
                        value={formatDate(auction.lockCutDate.time) || ""}
                        onChange={(e) =>
                          handleChange(auction.id, "lockCutDate.time", e)
                        }
                        onKeyDown={handleKeyPress}
                        readOnly
                      />
                      {/* <label htmlFor={`lockCutDateCompleted-${auction.id}`}>
                      Completed
                    </label> */}
                      <input
                        type="checkbox"
                        id={`lockCutDateCompleted-${auction.id}`}
                        checked={auction.lockCutDate.completed || false}
                        onChange={(e) =>
                          handleChange(auction.id, "lockCutDate.completed", e)
                        }
                        disabled
                      />
                    </div>
                    <div className="inputsSections">
                      <label htmlFor={`lienDate-${auction.id}`}>Lien</label>
                      <input
                        id={`lienDate-${auction.id}`}
                        type="date"
                        value={formatDate(auction.lienDate.time) || ""}
                        onChange={(e) =>
                          handleChange(auction.id, "lienDate.time", e)
                        }
                        onKeyDown={handleKeyPress}
                        readOnly
                      />
                      {/* <label htmlFor={`lienDateCompleted-${auction.id}`}>
                      Completed
                    </label> */}
                      <input
                        type="checkbox"
                        id={`lienDateCompleted-${auction.id}`}
                        checked={auction.lienDate.completed || false}
                        onChange={(e) =>
                          handleChange(auction.id, "lienDate.completed", e)
                        }
                        disabled
                      />
                    </div>
                    <div className="inputsSections">
                      <label htmlFor={`firstAdDate-${auction.id}`}>
                        First Ad
                      </label>
                      <input
                        id={`firstAdDate-${auction.id}`}
                        type="date"
                        value={formatDate(auction.firstAdDate.time) || ""}
                        onChange={(e) =>
                          handleChange(auction.id, "firstAdDate.time", e)
                        }
                        onKeyDown={handleKeyPress}
                        readOnly
                      />
                      {/* <label htmlFor={`firstAdDateCompleted-${auction.id}`}>
                      Completed
                    </label> */}
                      <input
                        type="checkbox"
                        id={`firstAdDateCompleted-${auction.id}`}
                        checked={auction.firstAdDate.completed || false}
                        onChange={(e) =>
                          handleChange(auction.id, "firstAdDate.completed", e)
                        }
                        disabled
                      />
                    </div>
                    <div className="inputsSections">
                      <label htmlFor={`secondAdDate-${auction.id}`}>
                        Second Ad
                      </label>
                      <input
                        id={`secondAdDate-${auction.id}`}
                        type="date"
                        value={formatDate(auction.secondAdDate.time) || ""}
                        onChange={(e) =>
                          handleChange(auction.id, "secondAdDate.time", e)
                        }
                        onKeyDown={handleKeyPress}
                        readOnly
                      />
                      {/* <label htmlFor={`secondAdDateCompleted-${auction.id}`}>
                      Completed
                    </label> */}
                      <input
                        type="checkbox"
                        id={`secondAdDateCompleted-${auction.id}`}
                        checked={auction.secondAdDate.completed || false}
                        onChange={(e) =>
                          handleChange(auction.id, "secondAdDate.completed", e)
                        }
                        disabled
                      />
                    </div>
                    <div className="inputsSections">
                      <label htmlFor={`auctionStart-${auction.id}`}>
                        Auction Start
                      </label>
                      <input
                        id={`auctionStart-${auction.id}`}
                        type="date"
                        value={formatDate(auction.auctionStart.time) || ""}
                        onChange={(e) =>
                          handleChange(auction.id, "auctionStart.time", e)
                        }
                        onKeyDown={handleKeyPress}
                        readOnly
                      />
                      {/* <label htmlFor={`auctionStartCompleted-${auction.id}`}>
                      Completed
                    </label> */}
                      <input
                        type="checkbox"
                        id={`auctionStartCompleted-${auction.id}`}
                        checked={auction.auctionStart.completed || false}
                        onChange={(e) =>
                          handleChange(auction.id, "auctionStart.completed", e)
                        }
                        disabled
                      />
                    </div>
                    <div className="inputsSections">
                      <label htmlFor={`auctionEnd-${auction.id}`}>
                        Auction End
                      </label>
                      <input
                        id={`auctionEnd-${auction.id}`}
                        type="date"
                        value={formatDate(auction.auctionEnd.time) || ""}
                        onChange={(e) =>
                          handleChange(auction.id, "auctionEnd.time", e)
                        }
                        onKeyDown={handleKeyPress}
                        readOnly
                      />
                    </div>
                    <div className="auctionUnits">
                      <p>Auction Units</p>
                      <p>Total Units {auction.auctionUnits.length}</p>
                      {auction.auctionUnits.map((unit) => (
                        <div className="units" key={unit.id}>
                          {unit.unit}
                          {/* <button
                          className="unitDeleteBtn"
                          type="button"
                          onClick={() => handleDeleteUnit(auction.id, unit.id)}
                        >
                          Delete 🗑️
                        </button> */}
                        </div>
                      ))}
                      {/* <input
                      type="text"
                      value={newUnits[auction.id] || ""}
                      onChange={(e) =>
                        setNewUnits({
                          ...newUnits,
                          [auction.id]: e.target.value,
                        })
                      }
                      placeholder="Add Unit"
                      onKeyDown={handleKeyPress}
                    />

                    <button
                      type="button"
                      className="addUnitBtn"
                      onClick={() => addUnit(auction.id)}
                    >
                      Add Unit
                    </button> */}
                    </div>
                    <div className="inputsSections">
                      <label>
                        Auction Finished:
                        <input
                          type="checkbox"
                          checked={auction.auctionFinished || false}
                          onChange={(e) =>
                            handleChange(auction.id, "auctionFinished", {
                              target: { value: e.target.checked },
                            })
                          }
                          onKeyDown={handleKeyPress}
                        />
                      </label>
                    </div>
                    {/* <button
                    type="button"
                    className="auctionDeleteBtn"
                    onClick={() =>
                      handleDeleteAuction(auction.id, auction.auctionEnd.time)
                    }
                  >
                    Delete Auction🗑️
                  </button> */}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
      {/* <button type="button" onClick={addNewAuction}>
        Add New Auction
      </button> */}
    </div>
  );

  return <div>{currentAuctionsElement}</div>;
};

export default EndedAuctions;

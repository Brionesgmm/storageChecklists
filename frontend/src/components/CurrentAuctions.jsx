import React, { useState } from "react";

const CurrentAuctions = ({
  setIsDataSubmitted,
  setIsMakingChanges,
  setCurrentAuctions,
  currentAuctions,
}) => {
  const [newUnit, setNewUnit] = useState("");

  const handleChange = (index, field, event) => {
    setIsDataSubmitted(false);
    setIsMakingChanges(true);

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
    }
  };

  const addUnit = (index) => {
    if (newUnit) {
      setCurrentAuctions((prevAuctions) => {
        const newAuctions = [...prevAuctions];
        // Create an object with the unit field before pushing to auctionUnits
        newAuctions[index].auctionUnits.push({
          unit: newUnit,
          id: `${Date.now()}`,
        });
        return newAuctions;
      });
      setNewUnit("");
    }
  };

  const handleDeleteUnit = (auctionIndex, unitId) => {
    setIsMakingChanges(true);
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

  const formatDate = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) {
      return "";
    }
    const date = new Date(dateString);
    return date.toISOString().substring(0, 10);
  };

  const currentAuctionsElement = (
    <div className="currentAuctionsSection">
      <h2>Current Auctions</h2>
      {currentAuctions.length === 0 ? (
        <div>No Auctions</div>
      ) : (
        currentAuctions.map((auction, index) => (
          <div className="liveAuctions" key={auction.id}>
            {console.log(auction.auctionEnd.time)}
            <h1>
              {auction.auctionEnd.time
                ? new Date(auction.auctionEnd.time).toLocaleDateString()
                : ""}
            </h1>
            <label htmlFor={`lockCutDate-${index}`}>Lock Cut Date</label>
            <input
              id={`lockCutDate-${index}`}
              type="date"
              value={formatDate(auction.lockCutDate.time) || ""}
              onChange={(e) => handleChange(index, "lockCutDate.time", e)}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor={`lockCutDateCompleted-${index}`}>Completed</label>
            <input
              type="checkbox"
              id={`lockCutDateCompleted-${index}`}
              checked={auction.lockCutDate.completed || false}
              onChange={(e) => handleChange(index, "lockCutDate.completed", e)}
            />
            <label htmlFor={`lienDate-${index}`}>Lien Date</label>
            <input
              id={`lienDate-${index}`}
              type="date"
              value={formatDate(auction.lienDate.time) || ""}
              onChange={(e) => handleChange(index, "lienDate.time", e)}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor={`lienDateCompleted-${index}`}>Completed</label>
            <input
              type="checkbox"
              id={`lienDateCompleted-${index}`}
              checked={auction.lienDate.completed || false}
              onChange={(e) => handleChange(index, "lienDate.completed", e)}
            />
            <label htmlFor={`firstAdDate-${index}`}>First Ad Date</label>
            <input
              id={`firstAdDate-${index}`}
              type="date"
              value={formatDate(auction.firstAdDate.time) || ""}
              onChange={(e) => handleChange(index, "firstAdDate.time", e)}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor={`firstAdDateCompleted-${index}`}>Completed</label>
            <input
              type="checkbox"
              id={`firstAdDateCompleted-${index}`}
              checked={auction.firstAdDate.completed || false}
              onChange={(e) => handleChange(index, "firstAdDate.completed", e)}
            />
            <label htmlFor={`secondAdDate-${index}`}>Second Ad Date</label>
            <input
              id={`secondAdDate-${index}`}
              type="date"
              value={formatDate(auction.secondAdDate.time) || ""}
              onChange={(e) => handleChange(index, "secondAdDate.time", e)}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor={`secondAdDateCompleted-${index}`}>Completed</label>
            <input
              type="checkbox"
              id={`secondAdDateCompleted-${index}`}
              checked={auction.secondAdDate.completed || false}
              onChange={(e) => handleChange(index, "secondAdDate.completed", e)}
            />
            <label htmlFor={`auctionStart-${index}`}>Auction Start</label>
            <input
              id={`auctionStart-${index}`}
              type="date"
              value={formatDate(auction.auctionStart.time) || ""}
              onChange={(e) => handleChange(index, "auctionStart.time", e)}
              onKeyDown={handleKeyPress}
            />
            <label htmlFor={`auctionStartCompleted-${index}`}>Completed</label>
            <input
              type="checkbox"
              id={`auctionStartCompleted-${index}`}
              checked={auction.auctionStart.completed || false}
              onChange={(e) => handleChange(index, "auctionStart.completed", e)}
            />
            <label htmlFor={`auctionEnd-${index}`}>Auction End</label>
            <input
              id={`auctionEnd-${index}`}
              type="date"
              value={formatDate(auction.auctionEnd.time) || ""}
              onChange={(e) => handleChange(index, "auctionEnd.time", e)}
              onKeyDown={handleKeyPress}
            />
            <div>
              <p>Auction Units</p>
              <p>Total Units {auction.auctionUnits.length}</p>
              {auction.auctionUnits.map((unit) => (
                <div key={unit.id}>
                  {unit.unit}
                  <button
                    type="button"
                    onClick={() => handleDeleteUnit(index, unit.id)}
                  >
                    Delete Unit
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={newUnit}
                onChange={(e) => setNewUnit(e.target.value)}
                placeholder="Add Unit"
                onKeyDown={handleKeyPress}
              />
              <button type="button" onClick={() => addUnit(index)}>
                Add Unit
              </button>
            </div>
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
            <button
              type="button"
              onClick={() =>
                handleDeleteAuction(auction.id, auction.auctionEnd.time)
              }
            >
              Delete Auction🗑️
            </button>
          </div>
        ))
      )}
      <button type="button" onClick={addNewAuction}>
        Add New Auction
      </button>
    </div>
  );

  return <div>{currentAuctionsElement}</div>;
};

export default CurrentAuctions;

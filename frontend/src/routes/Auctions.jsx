import { React, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import CurrentAuctions from "../components/CurrentAuctions";
import EndedAuctions from "../components/EndedAuctions";
import SubmittingDataSpinner from "../components/SubmittingDataSpinner";
import FetchingDataLoadIcon from "../components/FetchingDataLoadIcon";

const Auctions = () => {
  const [currentAuctions, setCurrentAuctions] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState("");
  const [facilityAuctionId, setFacilityAuctionId] = useState("");
  const [isActive, setIsActive] = useState({
    currentAuctions: true,
    endedAuctions: false,
  });
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  const [isAuctionDataLoading, setIsAuctionDataLoading] = useState(false);
  const [isMakingChanges, setIsMakingChanges] = useState(false);
  const { user } = useOutletContext();

  function changeTab(key) {
    setIsActive({
      currentAuctions: key === "currentAuctions",
      endedAuctions: key === "endedAuctions",
    });
  }

  async function getFacilityAuctions() {
    if (!selectedProperty) return; // Add this line
    try {
      setIsAuctionDataLoading(true);
      console.log(selectedProperty);
      const response = await fetch(
        `/api/auctions/facilityauctions/${selectedProperty}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFacilityAuctionId(data._id);
      setCurrentAuctions(data.currentAuctions);
      setIsAuctionDataLoading(false);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (user) {
      setSelectedProperty(user.property);
    }
  }, [user]);

  useEffect(() => {
    getFacilityAuctions();
  }, [selectedProperty]);

  const updateFacilityAuctions = async (event, facilityAuctionId) => {
    event.preventDefault();
    setIsDataSubmitted(false);
    setIsLoadingSubmit(true);
    setIsMakingChanges(false);
    const form = event.currentTarget;

    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user._id,
        currentAuctions: currentAuctions,
      }),
    });

    if (response.ok) {
      setIsDataSubmitted(true);
      setIsLoadingSubmit(false);
      console.log("Successfully updated the facility auctions");
    } else {
      console.error("There was an error updating the facility auctions");
    }
  };

  return (
    <div>
      <div className="tabBtns">
        <button
          className="btn currentAuctions"
          onClick={() => changeTab("currentAuctions")}
        >
          Current Auctions
        </button>
        <button
          className="btn endedAuctions"
          onClick={() => changeTab("endedAuctions")}
        >
          Ended Auctions
        </button>
      </div>
      <form
        action={`/api/auctions/updatefacilityauctions/${facilityAuctionId}?_method=PUT`}
        encType="multipart/form-data"
        method="POST"
        onSubmit={updateFacilityAuctions}
      >
        <button className="btn submitBtn" type="submit">
          Save Changes
        </button>
        {isMakingChanges && (
          <h2 className="makingChanges">Please Submit Changes</h2>
        )}
        {isLoadingSubmit && <SubmittingDataSpinner />}
        {isDataSubmitted && (
          <h2 className="submittedDataMsg">Facility auctions updated!</h2>
        )}
        {isActive.currentAuctions &&
          (isAuctionDataLoading ? (
            <FetchingDataLoadIcon />
          ) : (
            <CurrentAuctions
              setIsDataSubmitted={setIsDataSubmitted}
              setIsMakingChanges={setIsMakingChanges}
              setCurrentAuctions={setCurrentAuctions}
              currentAuctions={currentAuctions}
              isDataSubmitted={isDataSubmitted}
            />
          ))}
        {isActive.endedAuctions &&
          (isAuctionDataLoading ? (
            <FetchingDataLoadIcon />
          ) : (
            <EndedAuctions
              setIsDataSubmitted={setIsDataSubmitted}
              setIsMakingChanges={setIsMakingChanges}
            />
          ))}
      </form>
    </div>
  );
};

export default Auctions;

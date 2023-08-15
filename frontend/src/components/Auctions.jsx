import { React, useState } from "react";
import { useOutletContext } from "react-router-dom";
import FetchingDataLoadIcon from "./FetchingDataLoadIcon";

const Auctions = () => {
  const [isActive, setIsActive] = useState({
    currentAuctions: true,
    endedAuctions: false,
  });
  const { user } = useOutletContext();

  function changeTab(key) {
    setIsActive({
      currentAuctions: key === "currentAuctions",
      endedAuctions: key === "endedAuctions",
    });
  }

  return (
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
  );
};

export default Auctions;

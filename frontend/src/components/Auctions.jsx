import React from "react";
import { useOutletContext } from "react-router-dom";
import FetchingDataLoadIcon from "./FetchingDataLoadIcon";

const Auctions = () => {
  const { user } = useOutletContext();

  return <div>Auctions</div>;
};

export default Auctions;

import React from "react";
import { useOutletContext } from "react-router-dom";
const Auctions = () => {
  const { user } = useOutletContext();

  return <div>Auctions</div>;
};

export default Auctions;

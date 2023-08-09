import React from "react";

const SubmittingDataSpinner = () => {
  return (
    <div className="loadingSubmitMsg">
      <h2>Submitting data to database...</h2>
      <div className="spinner" />
    </div>
  );
};

export default SubmittingDataSpinner;

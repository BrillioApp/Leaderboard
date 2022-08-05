import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ShowMore = ({ displayAll }) => {
  const [isDisplayAll, setDisplay] = useState(false);
  const handleShowAll = () => {
    displayAll(!isDisplayAll);
    setDisplay(!isDisplayAll);
  };
  return (
    <div>
      <button
        className="btn btn-outline-primary mx-2"
        onClick={handleShowAll}
        style={{ marginTop: "10px" }}
      >
        {!isDisplayAll ? "Show More" : "Show Less"}
      </button>
    </div>
  );
};

export default ShowMore;

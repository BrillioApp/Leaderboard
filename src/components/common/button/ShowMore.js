import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default ShowMore = () => {
  return (
    <div>
      <button className="btn btn-outline-primary mx-2" onClick={handleShow}>
        Show More
      </button>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import moment from "moment"
import { getParticipantPoints } from "services/participation";

const Leaderboard = () => {
  const isLoggedInUser = localStorage.getItem("userId") ? true : false;
  const defaultMessage = "No Record Found";

  const [participantList, setParticipantList] = useState([]);
  const [showLoader, setLoader] = useState(false);

  useEffect(async () => {
    try {
      setLoader(true);
      let partcipantPointsData = await getParticipantPoints();
      setParticipantList(partcipantPointsData);
      setLoader(false);
      // console.log(partcipantPointsData, "participantList", participantList);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  }, []);

  return (
    <>
      <div className="login-bg">
        <Card className="card card-pos col-xs-12 col-sm-12 col-md-8 col-lg-8 my-3">
          {showLoader ? (
            <Spinner animation="border" variant="info" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <Accordion>
              {participantList.map((partcipant, index) => {
                return (
                  <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>
                      <span style={{ color: "#212529" }}>
                        {partcipant.name}
                      </span>
                      <span
                        style={{
                          position: "absolute",
                          right: "55px",
                          color: "#212529",
                        }}
                      >
                        {partcipant.totalPoints}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body className="p0">
                      <Table striped borderless hover variant="dark">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Activity Name</th>
                            <th>Description</th>
                            <th>Points</th>
                          </tr>
                        </thead>
                        <tbody>
                          {partcipant.activity.map((event, eventIndex) => {
                            return (
                              <tr key={eventIndex}>
                                <td>
                                {event.participationDate ? moment(new Date(event.participationDate)).format("DD/MM/YYYY") : "None"}</td>
                                <td>{event.activityName}</td>
                                <td>{event.participationDescription ? event.participationDescription : "None"}</td>
                                <td>{event.points}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
            </Accordion>
          )}
        </Card>
      </div>
    </>
  );
};

export default Leaderboard;

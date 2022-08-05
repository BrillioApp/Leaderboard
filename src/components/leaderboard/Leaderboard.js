import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import moment from "moment";
import {
  getParticipantPoints,
  getAllDepartments,
} from "services/participation";
import ShowMore from "components/common/button/ShowMore";

const Leaderboard = () => {
  const [isItemShow, setItemLength] = useState(5);
  const [participantList, setParticipantList] = useState([]);
  const [filteredParticipantList, setFilteredParticipantList] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [allDepartments, setDepartments] = useState([]);

  const getQuarteListonLoad = (list) => {
    let date = new Date();
    let currentQuarter = Math.floor(date.getMonth() / 3 + 1);
    let currentYear = new Date().getFullYear();
    switch (currentQuarter) {
      case 1: {
        let startDate = new Date(`${currentYear}-01-01`);
        let endDate = new Date(`${currentYear}-03-31`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate, list)
        );
        break;
      }
      case 2: {
        let startDate = new Date(`${currentYear}-04-01`);
        let endDate = new Date(`${currentYear}-06-30`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate, list)
        );

        break;
      }
      case 3: {
        let startDate = new Date(`${currentYear}-07-01`);
        let endDate = new Date(`${currentYear}-09-30`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate, list)
        );

        break;
      }
      case 4: {
        let startDate = new Date(`${currentYear}-10-01`);
        let endDate = new Date(`${currentYear}-12-31`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate, list)
        );
        break;
      }
      default:
        return "";
    }
  };

  useEffect(async () => {
    try {
      setLoader(true);
      let partcipantPointsData = await getParticipantPoints();
      setParticipantList(partcipantPointsData);
      getQuarteListonLoad(partcipantPointsData);
      let departments = await getAllDepartments();
      setDepartments(departments);
      setLoader(false);
      // console.log(partcipantPointsData, "participantList", participantList);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  }, []);

  //filter data by quarter
  const getCurrentQuarterData = (start, end, list) => {
    let quarterData = list.filter((participants) => {
      return (
        participants.activity.filter((data) => {
          return (
            new Date(data.participationDate) >= start &&
            new Date(data.participationDate) <= end
          );
        }).length != 0
      );
    });

    return quarterData;
  };

  const displayAll = (showFlag) => {
    if (showFlag) {
      setItemLength(participantList.length);
    } else {
      setItemLength(5);
    }
  };

  const getDepartmentName = (id) => {
    let filteredArr = allDepartments.filter((department) => {
      return department.id === id;
    });
    return filteredArr;
  };

  const onTabSelect = (key) => {
    let date = new Date();
    let currentQuarter = Math.floor(date.getMonth() / 3 + 1);
    let currentYear = new Date().getFullYear();
    if (key === "current") {
      switch (currentQuarter) {
        case 1: {
          let startDate = new Date(`${currentYear}-01-01`);
          let endDate = new Date(`${currentYear}-03-31`);
          setFilteredParticipantList(
            getCurrentQuarterData(startDate, endDate, filteredParticipantList)
          );
          break;
        }
        case 2: {
          let startDate = new Date(`${currentYear}-04-01`);
          let endDate = new Date(`${currentYear}-06-30`);
          setFilteredParticipantList(
            getCurrentQuarterData(startDate, endDate, filteredParticipantList)
          );

          break;
        }
        case 3: {
          let startDate = new Date(`${currentYear}-07-01`);
          let endDate = new Date(`${currentYear}-09-30`);
          setFilteredParticipantList(
            getCurrentQuarterData(startDate, endDate, filteredParticipantList)
          );

          break;
        }
        case 4: {
          let startDate = new Date(`${currentYear}-10-01`);
          let endDate = new Date(`${currentYear}-12-31`);
          setFilteredParticipantList(
            getCurrentQuarterData(startDate, endDate, filteredParticipantList)
          );
          break;
        }
        default:
          return "";
      }
    } else {
      let startDate = new Date(`${currentYear}-01-01`);
      let endDate = new Date(`${currentYear}-12-31`);
      setParticipantList(
        getCurrentQuarterData(startDate, endDate, participantList)
      );
    }
  };

  return (
    <>
      <div className="login-bg">
        <Card className="card card-pos col-xs-12 col-sm-12 col-md-8 col-lg-8 my-3 leaderboard">
          {showLoader ? (
            <Spinner animation="border" variant="info" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>
              <Tabs
                defaultActiveKey="current"
                id="justify-tab-example"
                className="mb-3"
                justify
                onSelect={onTabSelect}
              >
                <Tab
                  eventKey="current"
                  title={`Q${Math.floor(
                    new Date().getMonth() / 3 + 1
                  )} ${new Date().getFullYear()}`}
                >
                  <Accordion>
                    {filteredParticipantList.length &&
                      filteredParticipantList
                        .slice(0, isItemShow)
                        .sort((a, b) => b.totalPoints - a.totalPoints)
                        .map((partcipant, index) => {
                          return (
                            <Accordion.Item eventKey={index} key={index}>
                              <Accordion.Header
                                style={{ position: "relative" }}
                              >
                                <span style={{ color: "#212529" }}>
                                  {partcipant.name}
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    left: "150px",
                                  }}
                                >
                                  {
                                    getDepartmentName(
                                      partcipant.departmentId
                                    )[0].name
                                  }
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
                                      <th>Activity </th>
                                      <th>Details</th>
                                      <th>Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {partcipant.activity
                                      .sort((a, b) => b.points - a.points)
                                      .map((event, eventIndex) => {
                                        return (
                                          <tr key={eventIndex}>
                                            <td>
                                              {event.participationDate
                                                ? moment(
                                                    new Date(
                                                      event.participationDate
                                                    )
                                                  ).format("DD MMM YYYY")
                                                : "None"}
                                            </td>
                                            <td>{event.activityName}</td>
                                            <td>
                                              {event.participationDescription
                                                ? event.participationDescription
                                                : "None"}
                                            </td>
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
                </Tab>
                <Tab eventKey="all" title={`${new Date().getFullYear()}`}>
                  <Accordion>
                    {participantList.length &&
                      participantList
                        .slice(0, isItemShow)
                        .sort((a, b) => b.totalPoints - a.totalPoints)
                        .map((partcipant, index) => {
                          return (
                            <Accordion.Item eventKey={index} key={index}>
                              <Accordion.Header
                                style={{ position: "relative" }}
                              >
                                <span style={{ color: "#212529" }}>
                                  {partcipant.name}
                                </span>
                                <span
                                  style={{
                                    position: "absolute",
                                    left: "150px",
                                  }}
                                >
                                  {
                                    getDepartmentName(
                                      partcipant.departmentId
                                    )[0].name
                                  }
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
                                      <th>Activity </th>
                                      <th>Details</th>
                                      <th>Points</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {partcipant.activity
                                      .sort((a, b) => b.points - a.points)
                                      .map((event, eventIndex) => {
                                        return (
                                          <tr key={eventIndex}>
                                            <td>
                                              {event.participationDate
                                                ? moment(
                                                    new Date(
                                                      event.participationDate
                                                    )
                                                  ).format("DD MMM YYYY")
                                                : "None"}
                                            </td>
                                            <td>{event.activityName}</td>
                                            <td>
                                              {event.participationDescription
                                                ? event.participationDescription
                                                : "None"}
                                            </td>
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
                </Tab>
              </Tabs>
            </>
          )}
          {participantList?.length > 5 ? (
            <ShowMore displayAll={displayAll} />
          ) : null}
        </Card>
      </div>
    </>
  );
};

export default Leaderboard;

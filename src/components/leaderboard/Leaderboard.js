import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Spinner from "react-bootstrap/Spinner";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useLocation } from "react-router-dom";
import moment from "moment";
import {
  getParticipantPoints,
  getAllDepartments,
} from "services/participation";
import ShowMore from "components/common/button/ShowMore";

const Leaderboard = () => {
  const location = useLocation()
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
      let departments = await getAllDepartments();
      setDepartments(departments);
      let partcipantPointsData = await getParticipantPoints();
      setParticipantList(partcipantPointsData);
      getQuarteListonLoad(partcipantPointsData);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    if(participantList.length > 0){
      onTabSelect("prev")
    } 
  }, [participantList]);

  //filter data by quarter
  const getCurrentQuarterData = (start, end) => {
    let localCopy = JSON.parse(JSON.stringify(participantList))
    let quarterData = localCopy.filter((participant) => {
      return (
        participant.activity.filter((data) => {
          return (
            new Date(data.participationDate) >= start &&
            new Date(data.participationDate) <= end
          );
        }).length != 0
      );
    });

    quarterData.forEach(function (participant) {
      let activities= []
      participant.totalPoints = 0
      participant.activity.forEach(function (activity) {
        if(new Date(activity.participationDate) >= start &&
        new Date(activity.participationDate) <= end) {
          activities.push(activity)
          participant.totalPoints += activity.points
        }
      });
      participant.activity = activities
    });
    if(location.pathname === "/xt"){
        let departmentXt = allDepartments.filter((department) => {
        return department.name === "XT"
      })
      let xtData = quarterData.filter((xt) => {
        return xt.departmentId === departmentXt[0].id
      })
      return xtData
    }
    else{
        return quarterData;
    }
  
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

  const getCurrentQuarter = (key) => {
    let date = new Date();
    let currentQuarter = Math.floor(date.getMonth() / 3 );
    let currentYear = new Date().getFullYear();

    if (key === "current") {
      currentQuarter = Math.floor(date.getMonth() / 3 + 1);
      currentYear = new Date().getFullYear();
    }

    if(currentQuarter == 0){
      currentQuarter = 4
      currentYear -= 1
    }

    let monthsLabel = ""
    switch (currentQuarter) {
      case 1: {
        monthsLabel = "Jan - Mar"
        break;
      }
      case 2: {
        monthsLabel = "Apr - Jun"
        break;
      }
      case 3: {
        monthsLabel = "Jul - Sep"
        break;
      }
      case 4: {
        monthsLabel = "Oct - Dec"
        break;
      }
      default:
        return "";
    }
    return {
      currentQuarter,
      currentYear,
      monthsLabel
    }
  }
  const getTabTitle = (key) => {
    let getCurrentQuarterObj = getCurrentQuarter(key)

    return `Q${getCurrentQuarterObj.currentQuarter} ${getCurrentQuarterObj.currentYear} (${getCurrentQuarterObj.monthsLabel})`
  }
  const onTabSelect = (key) => {
    let getCurrentQuarterObj = getCurrentQuarter(key)
    let currentQuarter = getCurrentQuarterObj.currentQuarter;
    let currentYear = getCurrentQuarterObj.currentYear;

    switch (currentQuarter) {
      case 1: {
        let startDate = new Date(`${currentYear}-01-01`);
        let endDate = new Date(`${currentYear}-03-31`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate)
        );
        break;
      }
      case 2: {
        let startDate = new Date(`${currentYear}-04-01`);
        let endDate = new Date(`${currentYear}-06-30`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate)
        );

        break;
      }
      case 3: {
        let startDate = new Date(`${currentYear}-07-01`);
        let endDate = new Date(`${currentYear}-09-30`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate)
        );

        break;
      }
      case 4: {
        let startDate = new Date(`${currentYear}-10-01`);
        let endDate = new Date(`${currentYear}-12-31`);
        setFilteredParticipantList(
          getCurrentQuarterData(startDate, endDate)
        );
        break;
      }
      default:
        return "";
    }
  };

  const renderData = () => {
    if(filteredParticipantList.length === 0) {
      return (
        <span>Coming soon!</span>
      )
    } else {
      return filteredParticipantList
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, isItemShow)
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
                 marginLeft: "10px",
                 color: "#0d6efd"
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
      })
    }
  }
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
                defaultActiveKey="prev"
                id="justify-tab-example"
                className="mb-3"
                justify
                onSelect={onTabSelect}
              >
                <Tab
                  eventKey="prev"
                  title={getTabTitle("prev")}
                >
                  <Accordion>
                    {renderData()}
                  </Accordion>
                </Tab>
                <Tab eventKey="current"
                  title={getTabTitle("current")}>
                  <Accordion>
                    {renderData()}
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

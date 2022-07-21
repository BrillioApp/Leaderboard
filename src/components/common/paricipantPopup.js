import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Swal from "sweetalert2";
import {
  createPartcipant,
  updatePartcipant,
  createParticipation,
  updateParticipationList,
  deleteParticipation,
  getPartcipation,
} from "services/participation";
import { getActivities } from "services/activity";
import trashIcon from "assets/images/trash_icon.svg";

const ParticipantPopup = ({
  showModal,
  handleClose,
  participantData,
  resetState,
  participationData,
  setParticipationList,
}) => {
  const [participantdetails, setParticipant] = useState({
    firstname: participantData ? participantData.firstname : "",
    lastname: participantData ? participantData.lastname : "",
    designation: participantData ? participantData.designation : "",
    department: participantData ? participantData.department : "",
    employeeId: participantData ? participantData.employeeId : "",
    email: participantData ? participantData.email : "",
    phone: participantData ? participantData.phone : "",
  });

  const [activities, setActivities] = useState([]);
  const [rankList, setRankList] = useState([]);
  const [eventList, setEventList] = useState([
    {
      id: "",
      eventName: "",
      position: "",
      points: "None",
      activityId: "",
      participationId: "",
    },
  ]);

  useEffect(() => {
    try {
      const fetchEvents = async () => {
        let activities = await getActivities();
        setActivities(activities);
      };
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getData = (item) => {
    let filteredEvent = activities?.filter((event) => {
      return event.id === item.activityId;
    });
    if (filteredEvent.length) {
      let filteredPoints = filteredEvent?.filter((data) => {
        return data.points === item.points;
      });
      let returnObj = {
        name: filteredEvent.length ? filteredEvent[0].name : "uu",
        activityId: filteredEvent.length ? filteredEvent[0].id : "",
        points: filteredPoints?.length ? filteredPoints[0].points : "None",
      };

      return returnObj;
    }
  };
  useEffect(() => {
    if (participationData.length) {
      let list = [];
      participationData.map((item) => {
        list.push({
          id: item.activityId,
          eventName: getData(item)?.name,
          points: getData(item)?.points,
          activityId: getData(item)?.activityId,
          participationId: item.id,
        });
        return list;
      });
      let updatedList = list.filter((listItem) => {
        return listItem.activityId !== undefined;
      });
      if (updatedList.length) {
        setEventList(updatedList);
      }
    } else {
      setEventList([
        {
          id: "",
          eventName: "",
          position: "",
          points: "None",
          activityId: "",
          participationId: "",
        },
      ]);
    }
  }, [participationData]);

  const onInputSelected = (index) => (e) => {
    let filteredEvent = activities?.filter((activity) => {
      return activity.id === e.target.value;
    });
    let newArr = eventList.map((item, i) => {
      if (index == i) {
        return { ...item, id: e.target.value, points: filteredEvent[0].points };
      } else {
        return item;
      }
    });

    setEventList(newArr);
  };

  useEffect(async () => {
    setParticipant((prevState) => ({
      ...prevState,
      firstname: participantData ? participantData.firstname : "",
      lastname: participantData ? participantData.lastname : "",
      designation: participantData ? participantData.designation : "",
      employeeId: participantData ? participantData.employeeId : "",
      department: participantData ? participantData.department : "",
      email: participantData ? participantData.email : "",
      phone: participantData ? participantData.phone : "",
    }));
  }, [participantData]);

  let {
    firstname,
    lastname,
    department,
    designation,
    employeeId,
    email,
    phone,
  } = {
    ...participantdetails,
  };

  const userchangeHandler = (e) => {
    setParticipant({ ...participantdetails, [e.target.name]: e.target.value });
  };

  const submitButton = async () => {
    try {
      if (participantData) {
        let response = await updatePartcipant(
          participantData.id,
          firstname,
          lastname,
          employeeId,
          designation,
          department,
          email,
          phone
        );
        eventList.forEach(async (event) => {
          if (event.participationId != "") {
            let partcipationResp = await updateParticipationList(
              event.participationId,
              participantData.id,
              event.id,
              event.points
            );
          } else {
            let partcipationResp = await createParticipation(
              participantData.id,
              event.id,
              event.points
            );
          }
        });
        Swal.fire({
          text: "Participant has been updated.",
          icon: "success",
          timer: "2000",
          showConfirmButton: false,
        });
        resetState(response, "update");
      } else {
        let response = await createPartcipant(
          firstname,
          lastname,
          employeeId,
          designation,
          department,
          email,
          phone
        );
        eventList.forEach(async (event) => {
          let partcipationResp = await createParticipation(
            response.id,
            event.id,
            event.points
          );
        });

        Swal.fire({
          text: "Participant has been created.",
          icon: "success",
          timer: "2000",
          showConfirmButton: false,
        });
        resetState(response, "create");
      }
      handleClose();
    } catch (e) {
      console.log(e);
      // handleClose();
    }
  };

  const addMoreEvents = () => {
    let newEvent = {
      id: "",
      eventName: "",
      points: "None",
      activityId: "",
      participationId: "",
    };
    setEventList([...eventList, newEvent]);
  };
  const removeParticipation = async (index) => {
    if (eventList[index].participationId !== "") {
      participationData.splice(eventList[index].participationId, 1);
      let resp = await deleteParticipation(eventList[index].participationId);
      eventList.splice(index, 1);
    } else {
      eventList.splice(index, 1);
    }
    setEventList([...eventList]);
  };
  useEffect(async () => {
    setActivities(await getActivities());
  }, []);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        handleClose();
        setParticipationList(participationData);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {participantData ? "Edit Participant" : "Add Participant"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="loginRegister row">
          <div className="col-md-12">
            <div className="row">
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold required-field">
                  First Name:
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder=" First Name"
                  name="firstname"
                  value={firstname}
                  onChange={userchangeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold required-field">
                  {" "}
                  Last Name:
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder=" Last Name"
                  name="lastname"
                  value={lastname}
                  onChange={userchangeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  Department:
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder=" Department"
                  name="department"
                  value={department}
                  onChange={userchangeHandler}
                  required
                />
              </Form.Group>
              <div className="row">
                {eventList?.map((event, index) => {
                  return (
                    <React.Fragment key={index}>
                      <Form.Group className="mb-3  col-md-5">
                        <Form.Label className="text-primary d-flex font-weight-bold">
                          Event Name:
                        </Form.Label>

                        <Form.Select
                          placeholder=" Event Name"
                          name="eventname"
                          value={event.id}
                          onChange={onInputSelected(index)}
                          required
                        >
                          <option value="">Select Event</option>
                          {activities.map((activity) => {
                            return (
                              <option key={activity.id} value={activity.id}>
                                {activity.name}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group
                        className="mb-3  col-md-3"
                        controlId="formBasicName"
                      >
                        <Form.Label className="text-primary d-flex font-weight-bold">
                          Points:
                        </Form.Label>

                        <div
                          style={{
                            textAlign: "center",
                            paddingTop: "5px",
                            fontSize: "18px",
                          }}
                        >
                          {event.points}
                        </div>
                      </Form.Group>

                      <div className="col-md-2" style={{ paddingLeft: "40px" }}>
                        <span
                          className="btn btn-danger"
                          onClick={() => removeParticipation(index)}
                          style={{ marginTop: "30px" }}
                        >
                          <img src={trashIcon} />
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="col-md-12">
                <button
                  className="btn btn-warning"
                  onClick={addMoreEvents}
                  type="button"
                >
                  Add More Events
                </button>
              </div>
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  Designation:
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder=" Designation"
                  name="designation"
                  value={designation}
                  onChange={userchangeHandler}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold required-field">
                  EmployeeId:
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter EmployeeId"
                  name="employeeId"
                  value={employeeId}
                  onChange={userchangeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  Email-Id
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder=" Email"
                  name="email"
                  value={email}
                  onChange={userchangeHandler}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  {" "}
                  Phone Number:
                </Form.Label>

                <Form.Control
                  type="text"
                  placeholder=" Phone Number"
                  name="phone"
                  value={phone}
                  onChange={userchangeHandler}
                />
              </Form.Group>
            </div>
          </div>
          <div className="col-md-12">
            <div className=" col-md-12" style={{ textAlign: "center" }}>
              <Button
                className="btn btn-warning"
                onClick={submitButton}
                variant="primary"
                size="md"
              >
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default ParticipantPopup;

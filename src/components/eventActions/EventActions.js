import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { addEvent, updateEvent } from "services/Event";
import { getActivities, createActivity } from "services/activity";
import trashIcon from "assets/images/trash_icon.svg";

export const EventActions = ({ action, data, toggleShowModal, updateTab }) => {
  const [activities, setActivities] = useState([]);
  const [eventData, setEventData] = useState({
    id: "",
    activityId: { id: "", name: "" },
    organizer: "",
    date: "yyyy-mm-dd",
  });
  const [isLoadActivities, setLoad] = useState(false);

  const [newActivity, addActivity] = useState({
    name: "",
    ranks: [
      {
        position: "",
        points: "",
      },
    ],
  });

  useEffect(async () => {
    setActivities(await getActivities());
    if (data) {
      setEventData({ ...data, date: getDate(data.date) });
    }
  }, [isLoadActivities]);

  const getDate = (date) => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const onInputChanged = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
    // console.log(event.target.name, event.target.value);
  };

  const onAddActivity = (event) => {
    addActivity({ ...newActivity, [event.target.name]: event.target.value });
  };

  const onAddPosition = (name, index) => (event) => {
    let newArr = newActivity.ranks.map((item, i) => {
      if (index == i) {
        return { ...item, [name]: Number(event.target.value) };
      } else {
        return item;
      }
    });
    addActivity((prevState) => ({
      ...prevState,
      ranks: newArr,
    }));
  };

  const addrank = () => {
    newActivity.ranks.push({ position: "", points: "" });
    addActivity((prevState) => ({
      ...prevState,
      newActivity,
    }));
  };

  const onActionTriggered = async (action) => {
    try {
      let actionResponse;
      if (action === "Add") actionResponse = await addEvent(eventData);
      else if (action === "Update")
        actionResponse = await updateEvent(eventData);
      else actionResponse = await createActivity(newActivity);
      if (action === "Activity") {
        let newActivity = [...activities, actionResponse];
        setActivities(newActivity);
      }
      updateTab(action, actionResponse);
      toggleShowModal();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemPosition = (index) => {
    newActivity.ranks.splice(index, 1);
    addActivity((prevState) => ({
      ...prevState,
      newActivity,
    }));
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {action !== "Activity" ? (
            <span> {action} Event </span>
          ) : (
            "Add Activity"
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <div className="row">
            {action === "Activity" ? (
              <div className="row">
                <Form.Group
                  className="mb-3  col-md-12"
                  controlId="formBasicName"
                >
                  <Form.Label className="text-primary d-flex font-weight-bold">
                    Name:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder=" Name"
                    value={newActivity.name}
                    onChange={onAddActivity}
                  />
                </Form.Group>
                {newActivity.ranks?.map((rank, index) => {
                  return (
                    <div className="row" key={index}>
                      <Form.Group
                        className="mb-3  col-md-5"
                        controlId="formBasicName"
                      >
                        <Form.Label className="text-primary d-flex font-weight-bold">
                          Rank:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="position"
                          placeholder=" Rank"
                          value={rank.position}
                          onChange={onAddPosition("position", index)}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3  col-md-5"
                        controlId="formBasicName"
                      >
                        <Form.Label className="text-primary d-flex font-weight-bold">
                          Points:
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="points"
                          placeholder=" Points"
                          value={rank.points}
                          onChange={onAddPosition("points", index)}
                        />
                      </Form.Group>
                      {index !== 0 && (
                        <div className="col-md-2">
                          <span
                            className="btn btn-danger"
                            onClick={() => removeItemPosition(index)}
                            style={{ marginTop: "30px" }}
                          >
                            <img src={trashIcon} />
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
                <button
                  className="btn btn-success col-md-4 col-xs-12"
                  variant="primary"
                  style={{ marginBottom: "10px", marginLeft: "10px" }}
                  onClick={() => addrank()}
                >
                  Add More Ranks
                </button>
              </div>
            ) : action === "Add" ? (
              <>
                <label className="mb-2 text-primary d-flex font-weight-bold required-field">
                  Activity:
                </label>
                <select
                  className="mb-3  col-md-10 form-control"
                  aria-label="Default select example"
                  defaultValue={"0"}
                  name="activityId"
                  onChange={onInputChanged}
                >
                  <option value="0">Select activity</option>
                  {activities.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.name}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  Activity:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="activityName"
                  value={eventData.activityId.name}
                  readOnly
                />
              </Form.Group>
            )}
            {action !== "Activity" ? (
              <div>
                <Form.Group
                  className="mb-3  col-md-12"
                  controlId="formBasicName"
                >
                  <Form.Label className="text-primary d-flex font-weight-bold">
                    Organizer:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="organizer"
                    value={eventData.organizer}
                    onChange={onInputChanged}
                    required
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3  col-md-12"
                  controlId="formBasicName"
                >
                  <Form.Label className="text-primary d-flex font-weight-bold required-field">
                    Date:
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="date"
                    value={eventData.date}
                    onChange={onInputChanged}
                    required
                  />
                </Form.Group>{" "}
              </div>
            ) : null}

            {action === "Add" && (
              <div className="text-center">
                <Button
                  className="col-md-6"
                  variant="primary"
                  onClick={() => onActionTriggered("Add")}
                >
                  Add
                </Button>
              </div>
            )}
            {action === "Edit" && (
              <div>
                <Button
                  className="col-md-12"
                  variant="primary"
                  onClick={() => onActionTriggered("Update")}
                >
                  Submit
                </Button>
              </div>
            )}
            {action === "Activity" && (
              <div>
                <Button
                  className="col-md-12"
                  variant="primary"
                  onClick={() => onActionTriggered("Activity")}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import moment from "moment";
import { addEvent, updateEvent } from "services/Event";
import { updateActivity, createActivity } from "services/activity";
import trashIcon from "assets/images/trash_icon.svg";
import {creatLog} from "services/LogData"

export const EventActions = ({ action, data, toggleShowModal, updateTab }) => {
  const [eventData, setEventData] = useState(data);

  const onInputChanged = (event) => {
    setEventData({ ...eventData, [event.target.name]: event.target.value });
    // console.log(event.target.name, event.target.value);
  };

  const onActionTriggered = async (action) => {
    try {
      let actionResponse;
      if (action === "Add") {
        actionResponse = await createActivity(eventData);
        let date = moment(new Date()).format("MMM DD, yyyy | HH:mm A")
        let userId = localStorage.getItem("userId");
        let username = localStorage.getItem("username");
        let description = `The ${eventData.name} activity has been created by ${username}`
        let logResponse = creatLog(date,userId,description)
      }
       
      else if (action === "Update"){
        actionResponse = await updateActivity(eventData);
        let date = moment(new Date()).format("MMM DD, yyyy | HH:mm A")
        let userId = localStorage.getItem("userId");
        let username = localStorage.getItem("username");
        let description = `The ${eventData.name} activity has been updated by ${username}`
        let logResponse = creatLog(date,userId,description)
      }
        
      // else actionResponse = await createActivity(newActivity);

      updateTab(action, actionResponse);
      toggleShowModal();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          {action !== "Activity" ? (
            <span> {action} Activity </span>
          ) : (
            "Add Activity"
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col-md-12">
          <div className="row">
            <div className="row">
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  Name:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder=" Name"
                  value={eventData?.name}
                  onChange={onInputChanged}
                />
              </Form.Group>
              <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                <Form.Label className="text-primary d-flex font-weight-bold">
                  Points:
                </Form.Label>
                <Form.Control
                  type="text"
                  name="points"
                  placeholder=" Points"
                  value={eventData?.points}
                  onChange={onInputChanged}
                />
              </Form.Group>
            </div>
            {action === "Add" && (
              <div className="text-center">
                <Button
                  className="col-md-2"
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

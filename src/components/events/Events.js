import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import { getActivities, deleteActivity } from "services/activity";
import { Popup } from "components/common/popUp/Popup";
import editIcon from "assets/images/edit_icon.svg";
import trashIcon from "assets/images/trash_icon.svg";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");
  const [eventData, setEventData] = useState({
    id: "",
    name: "",
    points: "",
  });
  const [showLoader, setLoader] = useState(false);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const toggleShowModal = (eventAction, eventData) => {
    setEventData(eventData);
    setAction(eventAction);
    setShowModal(!showModal);
  };

  const getDate = (date) => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const updateEventsList = (action, data) => {
    if (action === "Add") setEvents([...events, data]);
    else if (action === "Update") {
      setEvents(
        events.map((event) => {
          if (event.id === data.id) return data;
          return event;
        })
      );
    } else if (action === "Delete") {
      setEvents(events.filter((event) => event.id !== data.id));
    }
  };

  const onActionTriggered = async (eventData) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel!",
        reverseButtons: false,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            let actionResponse = await deleteActivity(eventData);
            setEvents(events.filter((event) => event.id !== eventData.id));
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Event has been deleted.",
              icon: "success",
              timer: "2000",
              showConfirmButton: false,
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    try {
      let actionResponse = await deleteActivity(eventData);
      // updateTab(action, actionResponse);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      const fetchEvents = async () => {
        setLoader(true);
        let events = await getActivities();
        setEvents(events);
        setLoader(false);
      };
      fetchEvents();
    } catch (error) {
      setLoader(false);
      console.log(error);
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
            <>
              <Table striped borderless hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th>Points</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{event.name}</td>
                        <td>{event.points}</td>

                        <td>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              style={{ marginRight: "10px" }}
                              onClick={() => toggleShowModal("Edit", event)}
                            >
                              <img src={editIcon} />
                            </span>
                            <span onClick={() => onActionTriggered(event)}>
                              <img src={trashIcon} />
                            </span>
                          </div>
                        </td>
                        {/* <td>
                      <img
                        src={editIcon}
                        style={{ height: "30px", width: "30px" }}
                        onClick={() => toggleShowModal("Edit", event)}
                      />
                    </td> */}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <div className="row" style={{ marginTop: "10px" }}>
                <div className="col-md-12  mb-3">
                  <button
                    className="btn btn-outline-primary mx-2"
                    onClick={() => toggleShowModal("Add")}
                  >
                    Add Activity
                  </button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
      <Popup
        showModal={showModal}
        toggleShowModal={toggleShowModal}
        tab="event"
        action={action}
        data={eventData}
        updateTab={updateEventsList}
      />
    </>
  );
};

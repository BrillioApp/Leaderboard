import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Spinner from "react-bootstrap/Spinner";
import {
  getParticipantList,
  removeParticipant,
  getPartcipationsList,
} from "../../services/participation";
import ParticipantPopup from "../common/paricipantPopup";
import editICon from "assets/images/edit_icon.svg";
import trashIcon from "assets/images/trash_icon.svg";

export const ParticipantList = () => {
  const [participants, setParticipant] = useState([]);
  const [isShowModal, setShow] = useState(false);
  const [participantInfo, setData] = useState(undefined);
  const [participationData, setParticipationData] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const handleClose = async () => {
    setShow(false);
  };

  const setParticipationList = (data) => {
    setParticipationData(data);
    // setPhoto(file)
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleShow = () => {
    setData(undefined);
    setShow(true);
  };
  const editParticipant = async (data) => {
    try {
      let participationList = await getPartcipationsList();
      let filteredParticipation = participationList.filter((participation) => {
        return participation.participantId === data.id;
      });
      setParticipationData(filteredParticipation);
    } catch (e) {
      console.log(e);
    }
    setData(data);
    setShow(true);
  };

  const resetState = (value, type) => {
    if (type == "create") {
      let newObj = [value, ...participants];
      setParticipant(newObj);
    } else {
      let index = participants.findIndex(
        (participant) => participant.id === value.id
      );
      participants[index] = value;
      setParticipant(participants);
    }
  };

  useEffect(async () => {
    try {
      setLoader(true);
      let partcipantData = await getParticipantList();
      let allParticipants = [...partcipantData];
      setParticipant(allParticipants);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  }, []);

  useEffect(async () => {}, []);

  const removeData = (data) => {
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
            let resp = await removeParticipant(data.id);
            let participantList = participants.filter((filtered) => {
              return filtered.id !== data.id;
            });
            setParticipant(participantList);
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Participant has been deleted successfully.",
              icon: "success",
              timer: "2000",
              showConfirmButton: false,
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
  };

  return (
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
                  <th>Username</th>
                  <th>Department</th>
                  <th>Rank</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((participant, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {participant.firstname + " " + participant.lastname}
                      </td>
                      <td>{participant.department}</td>
                      <td>{index + 3}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{ marginRight: "10px" }}
                            onClick={() => editParticipant(participant)}
                          >
                            <img src={editICon} />
                          </span>
                          <span onClick={() => removeData(participant)}>
                            <img src={trashIcon} />
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <button
              className="btn btn-outline-primary mx-2"
              onClick={handleShow}
              style={{ marginTop: "10px" }}
            >
              Add Participant
            </button>
          </>
        )}
      </Card>
      <ParticipantPopup
        showModal={isShowModal}
        handleClose={handleClose}
        participantData={participantInfo}
        resetState={resetState}
        participationData={participationData}
        setParticipationList={setParticipationList}
      />
    </div>
  );
};

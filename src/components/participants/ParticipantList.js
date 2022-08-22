import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Spinner from "react-bootstrap/Spinner";
import moment from "moment";
import {
  getParticipantList,
  removeParticipant,
  getPartcipationsList,
  getAllDepartments,
} from "../../services/participation";
import ParticipantPopup from "../common/paricipantPopup";
import editICon from "assets/images/edit_icon.svg";
import trashIcon from "assets/images/trash_icon.svg";
import {creatLog} from "services/LogData"

export const ParticipantList = () => {
  const [participants, setParticipant] = useState([]);
  const [isShowModal, setShow] = useState(false);
  const [participantInfo, setData] = useState(undefined);
  const [participationData, setParticipationData] = useState([]);
  const [showLoader, setLoader] = useState(false);
  const [allDepartments, setDepartments] = useState([]);
  const [searchValue, setSearch] = useState("");
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
    setParticipationData([]);
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
      let departments = await getAllDepartments();
      setDepartments(departments);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
    }
  }, []);
      
   const filteredParticipants = participants.filter( ({firstname,lastname,employeeId}) => {
      return   (firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
      lastname.toLowerCase().includes(searchValue.toLowerCase()) ||
      employeeId.toLowerCase().includes(searchValue.toLowerCase()))
     }
     
    )
  useEffect(async () => {
 
   
  }, [searchValue]);

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
            let date = moment(new Date()).format("MMM DD, yyyy | HH:mm A")
            let userId = localStorage.getItem("userId");
            let username = localStorage.getItem("username");
            let description = `Participant ${data.firstname} ${data.lastname} has been deleted by ${username}`
            let logResponse = creatLog(date,userId,description)
          } catch (e) {
            console.log(e);
          }
        }
      });
  };

  const getDepartmentName = (id) => {
    let filteredArr = allDepartments.filter((department) => {
      return department.id === id;
    });
    return filteredArr;
  };

  const onSearchText = (e) => {
    setSearch(e.target.value)

  }


  return (
    <div className="login-bg">
      <Card className="card card-pos col-xs-12 col-sm-12 col-md-8 col-lg-8 my-3">
        {showLoader ? (
          <Spinner animation="border" variant="info" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
             <div 
             className="row"
              style={{
                marginBottom: "10px",
               
              }}
            >
            <div className="col-md-9">
             <Form.Group className="mb-3">
               <Form.Control
                  type="text"
                  placeholder=" Type a keyword to search..."
                  name="searchText"
                  value={searchValue}
                  onChange={onSearchText}
                  required
                />
           
            </Form.Group>
             
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-outline-primary"
                onClick={handleShow}
                style={{float:"right"}}
              >
                Add Participant
              </button>
              </div>
            </div>
            <Table striped borderless hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Employee Id</th>
                  <th>CoE</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {participant.firstname + " " + participant.lastname}
                      </td>
                      <td>{participant.employeeId}</td>
                      <td>
                        {getDepartmentName(participant.departmentId)[0].name}
                      </td>
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
        departmentList={allDepartments}
      />
    </div>
  );
};

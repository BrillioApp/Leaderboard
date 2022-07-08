// import React, { useState ,useEffect} from "react";
// import { useDispatch } from "react-redux";
// import { Modal, Button, ModalTitle} from "react-bootstrap";
// import Form from 'react-bootstrap/Form';
// import Add from "../add/Add";
// import './Overlay.css';
// import { addEvent, UpdateEvent } from "services/Event"
// import { addEventAction, updateEventAction } from "redux/actions/EventActions"
// import { addUser, UpdateUser } from "services/User";
// import { addUserAction, updateUserAction } from "redux/actions/UserActions";

// function Overlay({ showModal, handleClose, event, user, home, data}) {
//     const dispatch = useDispatch();
//     const [eventDetails, setEventDetails] = useState({
//         id:"",
//         name: "",
//         organiser: "",
//         date:""})
//     const {name, organiser, date } = { ...eventDetails }
//     const changeHandler = e => {
//         setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
//     }
//     const addEventsubmitHandler = async (e) => {
//         e.preventDefault();
//         const createdEvent = await addEvent(name, date, organiser)
//         dispatch(addEventAction(createdEvent))
//         handleClose()
//     }

//     const [userDetails, setUserDetails] = useState({
//         id:data?data.id:"",
//         fname: data?data.fname:"",
//         lname: data?data.lname:"",
//         designation:data?data.designation: "",
//         employeid: data?data.employeid:"",
//         emailid: data?data.emailid:""
//     })
//     const { id ,fname, lname, designation, emp_ID, email } = { ...userDetails }

//     useEffect(()=>{
//         setEventDetails(data);
//         setUserDetails(data)
//     },[data])

//     const userchangeHandler = e => {
//         setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
//     }
    
//     const addUserSubmitHandler =async e => {
//         e.preventDefault();
//         const createdUser = await addUser(fname, lname, designation, emp_ID, email)
//         dispatch(addUserAction(createdUser));
//         handleClose();
//     }
//     const editUserSubmitHandler =async (e)=>{
//         e.preventDefault();
//        const updatedUser= await UpdateUser(id,fname, lname, emp_ID, designation, email);
//         dispatch(updateUserAction(updatedUser));
//         handleClose();
//         alert(`Updated successfully`)

//     }

//     const editEventSubmitHandler = async(e)=>{
//         e.preventDefault();
//         const updatedEvent= await UpdateEvent(id ,name, date, organiser);
//         dispatch(updateEventAction(updatedEvent));
//         handleClose();
//         alert(`Updated successfully`)
//     }
   
//     return (
//         <div>
//             {/* <Modal  show={showModal} onHide={handleClose}> */}
//             <Modal>
//                 <Modal.Header closeButton>
//                     <ModalTitle> Popup</ModalTitle>
//                     {/* <Modal.Title>{(event && data) ? 'Edit Event Form': (user && data) ? 'Edit Participant Form':event? 'Add Events':user? 'Add Participants':'Add Points'}</Modal.Title> */}
//                 </Modal.Header>
//                 <Modal.Body>
//                     {event && <Form className="loginRegister row" onSubmit={data ?editEventSubmitHandler : addEventsubmitHandler}>
//                         <div className="col-md-12">
//                             <div className="row">
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold">Event Name:</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Event name"
//                                         name='name'
//                                         value={name} onChange={changeHandler} required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold">Event Date:</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Eventdate"
//                                         name='date'
//                                         value={date} onChange={changeHandler} required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold">Organiser Name:</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Organiser"
//                                         name='organiser'
//                                         value={organiser} onChange={changeHandler} required
//                                     />
//                                 </Form.Group>

//                             </div>
//                         </div>
//                         <div className="col-md-12 ">
//                             <div className=" col-md-12">
//                                 <Button className="btn btn-warning"
//                                     type="submit"
//                                     variant="primary"
//                                     size="md"
//                                 >
//                                     Submit
//                                 </Button>
//                             </div>
//                         </div>
//                     </Form>}
//                     {user && <Form className="loginRegister row" onSubmit={data? editUserSubmitHandler : addUserSubmitHandler}>
//                         <div className="col-md-12">
//                             <div className="row">
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold"> First Name:</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder=" First Name"
//                                         name='fname'
//                                         value={fname} onChange={userchangeHandler} required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold"> Last Name:</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder=" Last Name"
//                                         name='lname'
//                                         value={lname} onChange={userchangeHandler} required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold">Designation:</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Designation"
//                                         name='designation'
//                                         value={designation} onChange={userchangeHandler} required
//                                     />
//                                 </Form.Group>

//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold"> EmployeeId:</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder="Enter EmployeeId"
//                                         name='emp_ID'
//                                         value={emp_ID} onChange={userchangeHandler} required
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
//                                 <Form.Label className="text-primary d-flex font-weight-bold">Email-Id</Form.Label>
                                   
//                                     <Form.Control
//                                         type="text"
//                                         placeholder=" EmailId"
//                                         name='email'
//                                         value={email} onChange={userchangeHandler} required
//                                     />
//                                 </Form.Group>
//                             </div>
//                         </div>
//                         <div className="col-md-12">
//                             <div className=" col-md-12">
//                                 <Button className="btn btn-warning"
//                                     type="submit"
//                                     variant="primary"
//                                     size="md"
//                                 >
//                                     Submit
//                                 </Button>
//                             </div>
//                         </div>
//                     </Form>}
//                     {home && !user && <Add handleClose={handleClose} data={data}/>}
//                 </Modal.Body>
//             </Modal>
//         </div>
//     )
// }
// export default Overlay;
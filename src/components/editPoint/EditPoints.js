import { Form, Row, Col, Button } from "react-bootstrap";
import Select from 'react-select';
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { AddPoints, getUsers } from "services/User";
import { retrieveUserAction} from "redux/actions/UserActions";
const EditPoints = ({handleEdit}) => {
    const dispatch=useDispatch();
    const users=useSelector(state=>state.userReducer);
    const events=useSelector(state=>state.eventReducer);
    const [scoreCard,setScoreCard]=useState({
        userID:'',
        eventID:'',
        points:10
    })
    const {userID,eventID,points} =scoreCard;
    
    let userOptions=users.map((user)=>{return{value:user.id,label:user.fname}})
    let eventOptions=events.map((event)=>{return{value:event.id,label:event.name}})

    const submitHandler =async (e) => {
        e.preventDefault();
        await AddPoints(points,userID,eventID);
        const updatedUser= getUsers()
retrieveUserAction(updatedUser)
     handleEdit();
    }
    
    const changeHandler=(e,name)=>{
        console.log(name)
        setScoreCard({...scoreCard ,[name]:e.value})
   
    }

 
    return (
        <>
            <Form className="loginRegister row" onSubmit={e=>submitHandler(e)}>
                <div className="col-md-12">
                    <div className="row">
                        <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                        <Form.Label className="text-primary d-flex font-weight-bold">Select Participant Name</Form.Label>
                                   
                        <Select options={userOptions}  onChange={(e)=>changeHandler(e,'userID')}/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                                <Form.Label className="text-primary d-flex font-weight-bold">Select Event Name</Form.Label>
                                   
                                    <Select  options={eventOptions}   onChange={(e)=>changeHandler(e,"eventID")}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                                <Form.Label className="text-primary d-flex font-weight-bold">Enter Points</Form.Label>
                                   
                                    <Form.Control
                                        type="text"
                                        placeholder="Points"
                                        name='points'
                                        value={points}
                                        onChange={e=>changeHandler(e.target,'points')}

                                    />
                                </Form.Group>
                            </Col>
                           
                        </Row>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className=" col-md-3">
                        <Button className="btn btn-warning"
                            type="submit"
                            variant="primary"
                            size="md"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Form>
        </>
    )
}

export default EditPoints;
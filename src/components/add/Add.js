import { Form, Row, Col, Button } from "react-bootstrap";
import Select from 'react-select';
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { client } from "services/Client";
import { gql } from "@apollo/client";
import { AddPoints, getUser,UpdatePoints} from "services/User";
import { retrieveUserAction, updateUserAction } from "redux/actions/UserActions";

const Add = ({handleClose, data}) => {
    const dispatch=useDispatch();
    const users=useSelector(state=>state.userReducer);
    const events=useSelector(state=>state.eventReducer);
    const [scoreCard,setScoreCard]=useState({
        userID:'',
        eventID:'',
        points: null
    })
    useEffect(()=>{
        if(data && Object.keys(data).length>0){
          setScoreCard((prevState) => ({
                ...prevState,
                points:data.score.points[0].totalPoints
                }));
        }
        
    },[data])
    const {userID,eventID,points} =scoreCard;
    let userOptions=users.map((user)=>{return{value:user.id,label:user.fname}})
    let eventOptions=events.map((event)=>{return{value:event.id,label:event.name}})

    const submitHandler =async (e) => {
        e.preventDefault();
        const point = await AddPoints(points,userID,eventID);
        const user = await getUser(point.userID);
    dispatch(updateUserAction(user));
     handleClose();
     alert(`Updated successfully`)
    }
    const editUserSubmitHandler =async (e)=>{
        e.preventDefault();
        const point = await UpdatePoints(points,userID,eventID);
        const user = await getUser(point.EventWisePoints);
        dispatch(updateUserAction(user));
     handleClose();
        alert(`Updated successfully`)

    }
    const changeHandler=(e,name)=>{
        setScoreCard({...scoreCard ,[name]:e.value})  
    }


   

    return (
        <>
            <Form className="loginRegister row" onSubmit={data? editUserSubmitHandler :submitHandler}>
                <div className="col-md-12">
                    <div className="row">
                        <Form.Group className="mb-3  col-md-12" controlId="formBasicName">
                        <Form.Label className="text-primary d-flex font-weight-bold">Select Participant Name</Form.Label>
                                   
                        <Select options={userOptions}  onChange={(e)=>changeHandler(e,'userID')} required="required"/>
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
                                <Form.Label className="text-primary d-flex font-weight-bold">Points</Form.Label>
                                   
                                    <Form.Control
                                        type="text"
                                        placeholder="Points"
                                        name='points'
                                        value={scoreCard.points} required
                                        onChange={e=>changeHandler(e.target,'points')}

                                    />
                                     
                                </Form.Group>
                                
                            </Col>
                         
                        </Row>
                    
                         
                         <Row>
                         <Col>
                        <Form.Label className=" text-primary d-flex font-weight-bold">Description</Form.Label>
                                   
                                   <textarea class="col-md-12">Message</textarea>
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

export default Add;
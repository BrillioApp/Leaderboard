import "./home.css";
import React, { useReducer,useState } from "react";
import { Table } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import icon from './icon.jpg';
import { useSelector} from "react-redux"


function Home() {
  const newData=useSelector(state=>state.data);
  const [userData, setUserData] = useState(newData);
  const [numberOfRows,setNumberOfRows] = useState(5);
  const [show,setShow] = useState(true);
  const sorteData=userData.sort(function(a,b){
    return b.Points-a.Points;
  });
  let searchData = [];
  function search(inputValue){
    if(!inputValue){
      setUserData(newData);
      return;
    }
    searchData = sorteData.filter(item=>{
      console.log(item);
      return item.Name.toLowerCase() === inputValue.toLowerCase();
    });
  }
  function searchHandler(){
   setUserData(searchData);
  }
  // const users = [
  //   { Sr_no: "1 🏆", Name: "Player 1", Points: "5 points" },
  //   { Sr_no: "2", Name: "Kenrick VAz", Points: "5 points" },
  //   { Sr_no: "3", Name: "Player 3", Points: "5 points" },
  // ];
  
  return (
    <div className="App center-div">
    
        <h1 className="heading">Leaderboard</h1>
        <p className="text"> Last updated : few seconds ago</p>
        {(sorteData.length > 0) && <div className="col-10">

            <div className="form-inline my-2 my-lg-0 col-lg-3 col-md-3 col-sm-8 d-flex form-right">
                 <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>search(e.target.value)}/>
                 <button className="btn btn-outline-info m-2 my-sm-0" type="submit" onClick={searchHandler}>Search</button>
            </div>
        </div>}
        <Card className="card card-pos col-xs-12 col-sm-12 col-md-8 col-lg-8 my-3" >
          
          <Table className="table table-color" striped variant="">
            <tbody>
              {/* <tr>
                <td>Sr.no</td>
                <td> Name</td>
                <td>Points</td>
              </tr> */}
              {
                sorteData.length > 0 ?
             
              sorteData.map((item, i) =>
                 (i<numberOfRows && 
                  <tr key={i}>
                    <td className="txt-color col-md-1 text-center">{i+1}{i===0 &&<span>🏆</span>}</td>
                    <td className="txt-color">
                      <img
                        className="icon-image"
                        src={icon}
                        height={50}
                        width={50}
                      />
                      <span /> {item.Name}
                    </td>
                    <td className="txt-color form-right px-4">{item.Points} Points</td>
                  </tr>
                )
              )
              :<tr className="text-white">No Records Found</tr>
            }
            </tbody>
          </Table>
         
        </Card>
        <div className=" col-12 form-right mb-3">
        {(sorteData.length > 0) && show && <button className="btn btn-outline-info col-2" onClick={()=>{setNumberOfRows(sorteData.length);setShow(false)}}>Show more</button>}
          {(sorteData.length > 0) && (show === false) && <button className="btn btn-outline-info col-2" onClick={()=>{setNumberOfRows(5);setShow(true)}}>Show less</button>}
        
          </div>
      </div>

  );
}

export default Home;

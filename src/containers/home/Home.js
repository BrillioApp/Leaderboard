import React, { useReducer, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "containers/home/Home.css";
import Leaderboard from "components/leaderboard/Leaderboard";
import { Events } from "components/events/Events";
import { client } from "services/Client";
import { deleteEvent, fetchEvents } from "services/Event";
import {
  deleteEventAction,
  retrieveEventsAction,
  updateEventAction,
} from "redux/actions/EventActions";
import { deleteUser, getUsers } from "services/User";
// import "./home.css";
import {
  deleteUserAction,
  retrieveUserAction,
} from "redux/actions/UserActions";
import EditPoints from "components/editPoint/EditPoints";
import Content from "components/content/Content";
import { ParticipantList } from "../../components/participants/ParticipantList";

const Home = ({ newData, event, user, setUser, table }) => {
  // const [userData, setUserData] = useState(newData);
  // const [numberOfRows, setNumberOfRows] = useState(5);
  // const [show, setShow] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const [editId, setEditId] = useState("");
  // const [editFlag, setEditFlag] = useState(false);
  // const [data1, setData] = useState({});
  // const dispatch = useDispatch();
  const isLoggedInUser = localStorage.getItem("userId") ? true : false;
  const [isAdmin, setAdmin] = useState(false);
  const [tabs, setTabs] = useState([]);
  const location = useLocation();
  useEffect(() => {
    let adminFlag = localStorage.getItem("isAdmin") === "false" ? false : true;
    setAdmin(adminFlag);
    let tabList = isAdmin
      ? [
          { path: "/", name: "Leaderboard" },
          { path: "/eventdetails", name: "Events" },
          { path: "/participantdetails", name: "Participants" },
        ]
      : [];
    setTabs(tabList);
  }, [isAdmin]);

  const navTabs = tabs.map((tab) => {
    return (
      <NavLink
        className="btn btn-outline-info col-md-2 m-2"
        exact
        to={tab.path}
        activeClassName="active-link"
        key={tab.name}
      >
        {tab.name}
      </NavLink>
    );
  });

  // useEffect(async () => {
  //   const events = await fetchEvents();
  //   dispatch(retrieveEventsAction(events));
  //   const user = await getUsers();
  //   dispatch(retrieveUserAction(user));
  // }, []);

  // const users = useSelector((state) => state.userReducer);

  // const handleClose = () => {
  //   setShowModal(false);
  //   setEditFlag(false);
  // };
  // const handleShow = () => setShowModal(true);

  // const sorteData = event
  //   ? event
  //   : user
  //     ? user
  //     : users && Object.keys(users).length > 0
  //       ? [...users].sort(function (a, b) {
  //         let scoreB = b.score.points.length ? b.score.points[0].totalPoints : 0;
  //         let scoreA = a.score.points.length ? a.score.points[0].totalPoints : 0;
  //         return scoreB - scoreA;
  //       })
  //       : users;

  // let searchData = [];

  // function search(inputValue) {
  //   if (!inputValue) {
  //     setUserData(newData);
  //     return;
  //   }
  //   searchData = sorteData.filter((item) => {
  //     return item.Name.toLowerCase() === inputValue.toLowerCase();
  //   });
  // }

  // function searchHandler() {
  //   setUserData(searchData);
  // }
  // const handleAddMore = () => setShowModal(true);

  return (
    <div className="App center-div">
      {!isLoggedInUser && (
        <div>
          <h1 className="heading">Leaderboard</h1>
          {/* <Leaderboard /> */}
        </div>
      )}

      {isLoggedInUser && (
        <div className="row">
          <div className="col-md-12 py-1">{navTabs}</div>
        </div>
      )}

      {location.pathname === "/" ? (
        <Leaderboard />
      ) : location.pathname === "/participantdetails" ? (
        <ParticipantList />
      ) : (
        <Events />
      )}
    </div>
  );
};

export default Home;

// import HomeComponent from "components/home/Home";
// const Home = () => {
//   return (<HomeComponent newData={newData} table='home' />)
// }
// export default Home;

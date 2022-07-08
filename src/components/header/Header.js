import { useHistory, useLocation } from "react-router-dom";
import logo from "assets/images/logo-dashboard.jpg";
import "./Header.css";

const Header = ({ isLoggedIn, logout }) => {
  const location = useLocation();
  const history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <div className="center-div">
        {/* <img src={logo} height={250} width={400} alt="" className="logo-img" /> */}
        {location.pathname !== "/login" ? (
          <div
            className="btn btn-danger"
            style={{
              float: "right",
              margin: "10px 15px 0 0",
              color: "white",
              cursor: "pointer",
              position: "absolute",
              top: 0,
              right: 0,
            }}
            onClick={isLoggedIn ? logout : handleLogin}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Header;

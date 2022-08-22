import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router-dom";
import { getAdmin, getAdminFlag } from "services/admin";
import "./Login.css";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [loginUser, setLoginUser] = useState({ userId: "", password: "" });
  const [flag, setFlag] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await getAdmin(loginUser.userId, loginUser.password);
    let adminData = await getAdminFlag(userData.id);
    if (userData) {
      setFlag(false);
      setIsLoggedIn(userData.username);
      localStorage.setItem("username", userData.username);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem("isAdmin", adminData.isAdmin);
    } else {
      setFlag(true);
    }
  };

  return (
    <div className="login-bg">
      <div className="login py-4">
        {flag && (
          <div className="error">
            Please enter a valid username and password
          </div>
        )}
        <Card className="card card-login col-xs-12 col-sm-12 col-md-3 col-lg-3 my-3">
          <Form className="loginRegister">
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={loginUser.userId}
                name="userId"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                value={loginUser.password}
                name="password"
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                type="submit"
                variant="primary"
                size="md"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

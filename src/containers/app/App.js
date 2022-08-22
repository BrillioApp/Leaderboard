import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";

import Login from "components/login/Login";
import Home from "containers/home/Home";
import Header from "components/header/Header";
import EventDetail from "components/eventDetails/EventDetail";
import UserDetail from "components/userDetails/UserDetail";
import { client } from "services/Client";
import AuthRoute from "components/AuthRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState();
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    if (loggedInUserId) {
      setIsLoggedIn(loggedInUserId);
    }
  }, [loggedInUserId]);

  const logout = () => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      setIsLoggedIn("");
    }
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} logout={logout} />
      <Switch>
        <ApolloProvider client={client}>
          <Route exact path="/" component={() => <Home table="home" />} />
          <Route exact path="/xt" component={() => <Home table="home" />} />
          <Route
            exact
            path="/login"
            component={() => (
              <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            )}
          />
          <AuthRoute exact path="/participantdetails" component={UserDetail} />
          <AuthRoute exact path="/eventdetails" component={EventDetail} />
        </ApolloProvider>
      </Switch>
    </Router>
  );
};

export default App;

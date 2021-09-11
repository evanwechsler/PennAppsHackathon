import Container from "@material-ui/core/Container";
import Form from "./views/UserProfile/components/Form";
import "./style.css";
import { IconButton } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./views/Users/Users";
import UserProfile from "./views/UserProfile/UserProfile";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <Container className="App">
      <Router>
        <IconButton href="/users">
          <HomeRoundedIcon />
        </IconButton>
        <Switch>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/users/:id">
            <UserProfile />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

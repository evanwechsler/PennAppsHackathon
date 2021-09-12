import Container from "@material-ui/core/Container";
import "./style.css";
import { IconButton } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./views/Users/Users";
import UserProfile from "./views/UserProfile/UserProfile";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import background from "./simple-shiny.svg";

function App() {
  return (
    <div style={{ backgroundImage: `url(${background})` }} id="app">
      <Container className="App">
        <Router>
          <IconButton href="/users" style={{ margin: "1rem" }} className="home">
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
    </div>
  );
}

export default App;

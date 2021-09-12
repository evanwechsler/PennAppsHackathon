import React, {useState} from 'react';
import * as ROUTES from './routes'

import LandingPage from './components/LandingPage'
import RecordsPage from './components/RecordsPage'
import { BrowserRouter as Router,
  Route } from 'react-router-dom';
  import "./style.css"

function App() {
  const [user, setUser] = useState(null);
  return (
    <div style={{display: "grid", placeItems: "center", height: "100vh"}}>
      <Router>
        <Route exact path = {ROUTES.SIGN_UP} render={(props) => (
        <LandingPage {... props} setUser={setUser} user={user}/>
        )}/>
        <Route path = {ROUTES.RECORDS} render={(props) => (
        <RecordsPage {... props} user={user}/>
        )} />
      </Router>
    </div>
  )

}

export default App;

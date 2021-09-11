import React, {useState} from 'react';
import * as ROUTES from './routes'

import LandingPage from './components/LandingPage'
import Records from './components/Records'
import { BrowserRouter as Router,
  Route } from 'react-router-dom';

function App() {
  const [records, setRecords] = useState(null);
  return (
    <div style={{display: "grid", placeItems: "center", height: "100vh"}}>
      <Router>
        <Route exact path = {ROUTES.SIGN_UP} render={(props) => (
        <LandingPage {... props} setRecords={setRecords}/>
        )}/>
        <Route path = {ROUTES.RECORDS} render={(props) => (
        <Records {... props} records={records}/>
        )} />
      </Router>
    </div>
  )

}

export default App;

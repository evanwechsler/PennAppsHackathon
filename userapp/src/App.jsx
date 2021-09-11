import * as ROUTES from './routes'

import LandingPage from './components/LandingPage'
import Results from './components/Results'
import { BrowserRouter as Router,
  Route } from 'react-router-dom';

function App() {
  return (
    <div style={{display: "grid", placeItems: "center", height: "100vh"}}>
      <Router>
        <Route exact path = {ROUTES.SIGN_UP} component={LandingPage} />
        <Route path = {ROUTES.RESULTS} component= {Results} />
      </Router>
    </div>
  )

}

export default App;

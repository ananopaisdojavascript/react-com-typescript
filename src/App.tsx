import { Fragment } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CalendarPage from "./components/CalendarPage"
import date from "./date";


function App() {
  const month = date.getToday().substring(0, 7)
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/calendar/:month">
            <CalendarPage />
          </Route>
          <Redirect to={{pathname: `/calendar/${month}`}}/>
        </Switch>
      </Router>
    </Fragment>
  )
}

export default App

import React from 'react';
import { Route, Link } from "react-router-dom";
import '../style.css';
import Schedule from './Schedule';

const Schedules = ({ match }) => (
  <div>
    <h2>Schedules</h2>
    <ul>
      <li>
        <Link to={`${process.env.PUBLIC_URL}/${match.url}/normal`}>Normal</Link>
      </li>
      <li>
        <Link to={`${process.env.PUBLIC_URL}/${match.url}/wednesday`}>Wednesday</Link>
      </li>
      <li>
        <Link to={`${process.env.PUBLIC_URL}/${match.url}/rally`}>Rally</Link>
      </li>
    </ul>

    <Route path={`${process.env.PUBLIC_URL}/${match.path}/:id`} component={Schedule} />
    <Route
      exact
      path={`${process.env.PUBLIC_URL}/${match.path}`}
      render={() => <h3>Please select a schedule.</h3>}
    />

    <Link to={`${process.env.PUBLIC_URL}/`}>Back to Today's Schedule</Link>
  </div>
);

export default Schedules;
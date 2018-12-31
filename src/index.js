import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Schedules from './components/Schedules';
import './style.css';

const AppRouter = () => (
  <Router>
    <div className="app">
      <Route path="/" exact component={Home} />
      <Route path="/schedules" component={Schedules} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

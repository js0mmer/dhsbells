import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { convertTo12Hour, getScheduleFromDate } from '../utils';
import Schedule from './Schedule';

const inPeriod = (periods, i, time) => time >= parseRawTime(periods[i].start) && time < parseRawTime(periods[i].end);

const inPassingPeriod = (periods, i, time) => time >= parseRawTime(periods[i].end) && i < periods.length - 1 && time < parseRawTime(periods[i + 1].start);

const beforeSchool = (periods, time) => time < parseRawTime(periods[0].start);

const parseRawTime = (t) => parseInt(t.replace(":", ""));

function showPeriod() {
  var date = new Date();
  var time = rawTime(date);
  var s = getScheduleFromDate(date);

  if (s == null) return <h1 id="period">No Class</h1>;
  
  if (beforeSchool(s.periods, time)) {
    return (
      <div>
        <h3 id="period">No Class</h3>
        <h1 id="period-end">{s.periods[0].name} starts at {convertTo12Hour(s.periods[0].start)}</h1>
      </div>
    );
  }

  for (var i = 0; i < s.periods.length; i++) {
    if (inPeriod(s.periods, i, time)) {
      if (i < s.periods.length - 1) {
        return (
          <div>
            <h3 id="period">{s.periods[i].name}</h3>
            <h1 id="period-end">Ends at {convertTo12Hour(s.periods[i].end)}</h1>
            <h3 id="next-period">Next: {s.periods[i + 1].name} {convertTo12Hour(s.periods[i + 1].start)} - {convertTo12Hour(s.periods[i + 1].end)}</h3>
          </div>
        );
      } else {
        return (
          <div>
            <h3 id="period">{s.periods[i].name}</h3>
            <h1 id="period-end">Ends at {convertTo12Hour(s.periods[i].end)}</h1>
          </div>
        );
      }
    } else if (inPassingPeriod(s.periods, i, time)) {
      return (
        <div>
          <h3 id="period">Passing Period</h3>
          <h1 id="period-end">Ends at {convertTo12Hour(s.periods[i + 1].start)}</h1>
          <h3 id="next-period">Next: {s.periods[i + 1].name} {convertTo12Hour(s.periods[i + 1].start)} - {convertTo12Hour(s.periods[i + 1].end)}</h3>
        </div>
      );
    }
  }
  
  return <h3 id="period">No Class</h3>;
}

function showSchedule() {
  var date = new Date();
  var schedule = getScheduleFromDate(date);

  if (schedule != null) {
    return (
      <div>
        <h3>Today's Schedule</h3>
        <Schedule date={date} />
      </div>
    );
  } else {
    return;
  }
}

function rawTime(date) {
  var minutes = date.getMinutes().toString();

  if (minutes.length === 1) minutes = "0" + minutes;

  return parseInt(date.getHours() + minutes);
}

class Home extends Component {
  render() {
    return (
      <div>
        {showPeriod()}
        {showSchedule()}
        <Link to={`${process.env.PUBLIC_URL}/schedules`}>View all schedules</Link>
      </div>
    );
  }
}

export default Home;
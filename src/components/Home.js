import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { convertTo12Hour, buildSchedule, getScheduleFromDate } from '../utils';

function getTodaysSchedule() {
  return getScheduleFromDate(new Date());
}

function inPeriod(periods, i, time) {
  return time >= parseRawTime(periods[i].start) && time < parseRawTime(periods[i].end);
}

function inPassingPeriod(periods, i, time) {
  return time >= parseRawTime(periods[i].end) && i < periods.length - 1 && time < parseRawTime(periods[i + 1].start);
}

function beforeSchool(periods, time) {
  return time < parseRawTime(periods[0].start);
}

function showPeriod() {
  var time = rawTime();
  var s = getTodaysSchedule();

  if (s == null) return <h3 id="period">No Class</h3>;
  
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

function showSchedule(s, header) {
  var schedule = buildSchedule(s, header);

  if (schedule != null) {
    return schedule;
  } else {
    return;
  }
}

function parseRawTime(t) {
  return parseInt(t.replace(":", ""));
}

function rawTime() {
  var date = new Date();
  var minutes = date.getMinutes().toString();

  if (minutes.length === 1) minutes = "0" + minutes;

  return parseInt(date.getHours() + minutes);
}

// function fancyTime() {
//   var date = new Date();
//   var hours = date.getHours();
//   var minutes = date.getMinutes().toString();

//   if(hours > 12) {
//     hours = hours - 12;
//   }

//   if(minutes.length === 1) {
//     minutes = "0" + minutes;
//   }

//   return hours + ":" + minutes + (date.getHours() > 12 ? " PM" : " AM");
// }

class Home extends Component {
  render() {
    return (
      <div>
        {showPeriod()}
        {showSchedule(getTodaysSchedule(), "Today's Schedule")}
        <Link to={`${process.env.PUBLIC_URL}/schedules`}>View all schedules</Link>
      </div>
    );
  }
}

export default Home;
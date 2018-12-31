import React, { Component } from 'react';
import '../style.css';
import { Link } from "react-router-dom";
import normal from '../schedules/normal';
import wednesday from '../schedules/wednesday';
// import rally from '../schedules/rally';
import tuesday1 from '../schedules/finals1/tuesday';
import wednesday1 from '../schedules/finals1/wednesday';
import thursday1 from '../schedules/finals1/thursday';
import friday1 from '../schedules/finals1/friday';
import friday2 from '../schedules/finals2/friday';
import tuesday2 from '../schedules/finals2/tuesday';
import wednesday2 from '../schedules/finals2/wednesday';
import thursday2 from '../schedules/finals2/thursday';


function getTodaysSchedule() {
  var date = new Date();
  var day = date.getDay();

  if (day !== 0 && day !== 6) {
    var schedule = normal;
    
    if (day === 3) {
      schedule = wednesday;
    }
    
    // Sem 1 Finals
    if (date.getMonth() === 11) {
      if (date.getDate() === 18) {
        schedule = tuesday1;
      } else if (date.getDate() === 19) {
        schedule = wednesday1;
      } else if (date.getDate() === 20) {
        schedule = thursday1;
      } else if (date.getDate() === 21) {
        schedule = friday1;
      }
    } else if (date.getMonth() === 4) { // Sem 2 Finals
      if (date.getDate() === 25) {
        schedule = friday2;
      } else if (date.getDate() === 29) {
        schedule = tuesday2;
      } else if (date.getDate() === 30) {
        schedule = wednesday2;
      } else if (date.getDate() === 31) {
        schedule = thursday2;
      }
    }

    return schedule;
  } else {
    return null;
  }
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

  if (s == null) {
    return <h3 id="period">No Class</h3>;
  }
  
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
}

function showSchedule(s, header) {
  if (s == null) {
    return;
  } else {
    return (
      <div>
        <h3 id="schedule-header">{header}</h3>
        <table id="schedule">
          <thead>
            <tr>
              <th>Period</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {genRows(s)}
          </tbody>
        </table>
      </div>
    );
  }
}

function genRows(s) {
  var html = [];
  for (var i = 0; i < s.periods.length; i++) {
    html.push(
      <tr>
        <td>{s.periods[i].name}</td>
        <td>{convertTo12Hour(s.periods[i].start)}</td>
        <td>{convertTo12Hour(s.periods[i].end)}</td>
      </tr>
    );
  }

  return html;
}

function convertTo12Hour(t) {
  if(t.length < 5) {
    return t + " AM";
  } else if(parseInt(t.substring(0, 2)) < 12) {
    return t + " AM";
  } else if(parseInt(t.substring(0, 2)) === 12) {
    return t + " PM";
  } else {
    return (parseInt(t.substring(0, 2)) - 12) + t.substring(2, 5) + " PM";
  }
}

function parseRawTime(t) {
  return parseInt(t.replace(":", ""));
}

function rawTime() {
  var date = new Date();
  var minutes = date.getMinutes().toString();

  if(minutes.length === 1) {
    minutes = "0" + minutes;
  }

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
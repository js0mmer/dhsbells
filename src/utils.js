import React from 'react';
import normal from './schedules/normal';
import wednesday from './schedules/wednesday';
import rally from './schedules/rally';
// import assembly from './schedules/assembly';
import previewDay from './schedules/preview-day';
// Final Schedules
import tuesday1 from './schedules/finals1/tuesday';
import wednesday1 from './schedules/finals1/wednesday';
import thursday1 from './schedules/finals1/thursday';
import friday1 from './schedules/finals1/friday';
import friday2 from './schedules/finals2/friday';
import tuesday2 from './schedules/finals2/tuesday';
import wednesday2 from './schedules/finals2/wednesday';
import thursday2 from './schedules/finals2/thursday';
// Block Schedules
import blockTuesday from './schedules/block/march/tuesday.js';
import blockWedsMarch from './schedules/block/march/wednesday';
import blockTuesThurs from './schedules/block/april/tues_thurs.js';
import blockWedsApril from './schedules/block/april/wednesday.js';
import blockFriday from './schedules/block/april/friday.js';

export function getScheduleFromDate(date) {
  var day = date.getDay();

  if (day !== 0 && day !== 6) { // if not sunday and not saturday
    var schedule = normal; // default to normal schedule
    
    if (day === 3) schedule = wednesday; // default to normal weds schedule on wednesdays
    
    if (date.getMonth() === 11) { // Sem 1 Finals
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
    } else if (date.getMonth() === 0 && date.getDate() === 30) { // Preview Day 1/30
      schedule = previewDay;
    } else if (date.getMonth() === 1 && date.getDate() === 15) { // Rally 2/15
      schedule = rally;
    } else if (date.getMonth() === 2) { // March Block Schedules
      if (date.getDate() === 12 || date.getDate() === 19 || date.getDate() === 26) { // Tuesdays
        schedule = blockTuesday;
      } else if (date.getDate() === 13 || date.getDate() === 20 || date.getDate() === 27) { // Wednesdays
        schedule = blockWedsMarch;
      }
    } else if (date.getMonth() === 3) { // April Block Schedules
      if (date.getDate() === 16 || date.getDate() === 23 || date.getDate() === 18 || date.getDate() === 25) { // Tuesdays and Thursdays
        schedule = blockTuesThurs;
      } else if (date.getDate() === 17 || date.getDate() === 24) { // Wednesdays
        schedule = blockWedsApril;
      } else if (date.getDate() === 19 || date.getDate() === 26) { // Fridays
        schedule = blockFriday;
      }
    }

    return schedule;
  } else {
    return null; // return null if sunday or saturday
  }
}

export function buildSchedule(s, header) {
  if (s == null) {
    return null;
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

export function convertTo12Hour(t) {
  if (t.length < 5) {
    return t + " AM";
  } else if (parseInt(t.substring(0, 2)) < 12) {
    return t + " AM";
  } else if (parseInt(t.substring(0, 2)) === 12) {
    return t + " PM";
  } else {
    return (parseInt(t.substring(0, 2)) - 12) + t.substring(2, 5) + " PM";
  }
}
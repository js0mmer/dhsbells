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

function noSchool(date) {
  var month = date.getMonth() + 1;
  date = date.getDate();

  if (date.getDay() === 0 || date.getDay() === 6) { // weekends
    return true;
  } else if (month === 3) { // march
    return date === 14 || date === 17; // teacher work days
  } else if (month === 4) { // april
    return date >= 1 && date <= 5; // spring break
  } else if (month >= 6 && month < 8) { // summer
    return true;
  }

  return false;
}

export function getScheduleFromDate(date) {
  if (date === null || noSchool) return null;

  var day = date.getDay();
  var month = date.getMonth() + 1;
  date = date.getDate();

  var schedule = normal; // default to normal schedule
  
  if (day === 3) schedule = wednesday; // default to normal weds schedule on wednesdays
  
  if (month === 12) { // Sem 1 Finals
    if (date === 18) {
      schedule = tuesday1;
    } else if (date === 19) {
      schedule = wednesday1;
    } else if (date === 20) {
      schedule = thursday1;
    } else if (date === 21) {
      schedule = friday1;
    }
  } else if (month === 5) { // Sem 2 Finals
      if (date === 28) {
      schedule = tuesday2;
    } else if (date === 39) {
      schedule = wednesday2;
    } else if (date === 30) {
      schedule = thursday2;
    } else if (date === 31) {
      schedule = friday2;
    }
  } else if (month === 1 && date === 30) { // Preview Day 1/30
    schedule = previewDay;
  } else if (month === 2 && date === 15) { // Rally 2/15
    schedule = rally;
  } else if (month === 3) { // March Block Schedules
    if (date === 12 || date === 19 || date === 26) { // Tuesdays
      schedule = blockTuesday;
    } else if (date === 13 || date === 20 || date === 27) { // Wednesdays
      schedule = blockWedsMarch;
    }
  } else if (month === 4) { // April Block Schedules
    if (date === 16 || date === 23 || date === 18 || date === 25) { // Tuesdays and Thursdays
      schedule = blockTuesThurs;
    } else if (date === 17 || date === 24) { // Wednesdays
      schedule = blockWedsApril;
    } else if (date === 19 || date === 26) { // Fridays
      schedule = blockFriday;
    }
  }

  return schedule;
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

export function parseDate(input) {
  if (input === '') return;

  var parts = input.split('-');
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-11
}
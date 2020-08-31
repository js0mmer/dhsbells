import React from 'react';
import evens from './schedules/evens';
import odds from './schedules/odds';
import weds from './schedules/weds';

export function getScheduleFromDate(date) {
  if (date == null) return null;

  var schedule;

  switch(date.getDay()) {
    case 1:
    case 4:
      schedule = evens;
      break;
    case 2:
    case 5:
      schedule = odds;
      break;
    case 3:
      schedule = weds;
      break;
    default:
      schedule = null;
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
import React from 'react';

function showSchedule(s, header) {
  if (s == null) {
    return <h3>Error: Schedule Not Found</h3>;
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
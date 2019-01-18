import React from 'react';
import '../style.css';
import normal from '../schedules/normal';
import wednesday from '../schedules/wednesday';
import rally from '../schedules/rally';
import assembly from '../schedules/assembly';
import tuesday1 from '../schedules/finals1/tuesday';
import wednesday1 from '../schedules/finals1/wednesday';
import thursday1 from '../schedules/finals1/thursday';
import friday1 from '../schedules/finals1/friday';
import friday2 from '../schedules/finals2/friday';
import tuesday2 from '../schedules/finals2/tuesday';
import wednesday2 from '../schedules/finals2/wednesday';
import thursday2 from '../schedules/finals2/thursday';

function getSchedule(path) {
  switch(path) {
    case "normal":
      return normal;
    case "wednesday":
      return wednesday;
    case "rally":
      return rally;
    case "assembly":
      return assembly;
    case "finals1/tuesday":
      return tuesday1;
    case "finals1/wednesday":
      return wednesday1;
    case "finals1/thursday":
      return thursday1;
    case "finals1/friday":
      return friday1;
    case "finals2/friday":
      return friday2;
    case "finals2/tuesday":
      return tuesday2;
    case "finals2/wednesday":
      return wednesday2;
    case "finals2/thursday":
      return thursday2;
    default:
      return null;
  }
}

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

const Schedule = ({ match }) => (
  <div>
    {showSchedule(getSchedule(match.params.id), `${match.params.id.substring(0, 1).toUpperCase() + match.params.id.substring(1)} Schedule`)}
  </div>
);

export default Schedule;
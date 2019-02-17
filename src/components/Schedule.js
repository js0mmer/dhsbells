import React from 'react';
import { buildSchedule, getScheduleFromDate } from '../utils';

function Schedule(props) {
  if (props.date == null) return null;

  var schedule = getScheduleFromDate(props.date);

  if (schedule == null) {
    return <h2>No School</h2>;
  } else {
    return buildSchedule(schedule);
  }
}

export default Schedule;
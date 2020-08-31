import React from 'react';
import { Link } from 'react-router-dom';
import Schedule from './Schedule';
import { parseDate } from '../utils';

function Day(props) {
  if (props.date == null) return null;

  var date = props.date;
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December'];

  var suffix = 'th';
  var d = date.getDate().toString();
  if (!d.startsWith('1')) {
    if (d.endsWith('1')) {
      suffix = 'st';
    } else if (d.endsWith('2')) {
      suffix = 'nd';
    } else if (d.endsWith('3')) {
      suffix = 'rd';
    }
  } else if (d === '1') {
    suffix = 'st';
  }

  return <h2>{days[date.getDay()]} {months[date.getMonth()]} {d}{suffix}</h2>
}

class Schedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>Schedules</h1>
        <input type='date' value={this.state.value} onChange={this.handleChange} />
        <br />
        <Day date={parseDate(this.state.value)} />
        <Schedule date={parseDate(this.state.value)} />
        <Link to={`${process.env.PUBLIC_URL}/`}>Back to Today's Schedule</Link>
      </div>
    );
  }
}

export default Schedules;
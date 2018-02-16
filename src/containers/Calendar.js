import React, { Component } from 'react';
import classes from './Calendar.css';
import Month from '../components/Year/Month/Month';
import Year from '../components/Year/Year';
import DayNames from '../components/Year/Month/Days/DayNames/DayNames';
import Days from '../components/Year/Month/Days/Days';

const moment = require('moment');

const DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CURRENT_DATE = () => {
  const date = moment().format("YYYY-MM-DD");
  const dateArray = date.split("-");
  return {
    year: dateArray[0],
    month: dateArray[1],
    day: dateArray[2]
  }
};

class Calendar extends Component {
  state = {
    currentDate: {
      year: CURRENT_DATE().year,
      month: CURRENT_DATE().month-1,
      day: CURRENT_DATE().day
    }
  };

  getDays = () => {
    let days = [1,2,3,4];
    let day;
    const currentDate = {...this.state.currentDate};
    let firstCalDate;
    const firstOfMonth =
      moment()
      .year(currentDate.year)
      .month(currentDate.month)
      .date(1);
    const firstDayOfMonth = firstOfMonth.day();

    // TODO: create an object with the year, month, and day of the first day
    // check if the day of the week is a sunday.
    // if it is not, then subtract the number of days to sunday and add the previous
    // month's days to the days array.

    console.log(firstDayOfMonth);
    if (firstOfMonth != 0){

    }
    return days;
  }

  render() {
    //console.log(days);
    let day = moment().year(this.state.currentDate.year).month(this.state.currentDate.month).date(this.state.currentDate.day);
    //console.log(day);
    //console.log(moment().month(this.state.currentDate.month-1).format('MMMM'));
    console.log(moment().day());
    return (
      <div className={classes.Calendar}>
        <div className={classes.MonthYear}>
          <div className={classes.Month}>
            <Month month={moment().month(this.state.currentDate.month).format('MMMM')} />
          </div>
          <div className={classes.Year}>
            <Year year={this.state.currentDate.year}/>
          </div>
        </div>
        <div className={classes.DayNames}>
          <DayNames names={DAY_NAMES} />
        </div>
        <div className={classes.Days}>
          <Days days={this.getDays} />
        </div>
      </div>
    );
  }
}

export default Calendar;

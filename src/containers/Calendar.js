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
    console.log("IN getDays");
    let days = {
      prev: [],
      current: [],
      next: []
    };

    const currentDate = {...this.state.currentDate};

    // first of the current month
    const firstOfMonth = moment().year(currentDate.year).month(currentDate.month).date(1);
    const firstDayOfMonth = firstOfMonth.day();
    const current = {
      year: currentDate.year,
      month: "0"+(currentDate.month),
      firstofMonth: "01",
      day: firstDayOfMonth
    };
    let daysToStartOfCal = 0;

    if (current.day !== 0){ // current Month's first day is not a sunday
      let prevMonth = current.month - 1;
      daysToStartOfCal = current.firstofMonth - current.day;

      for (let i = daysToStartOfCal; i <= 0; i++) { // get rolling dates from previous month
        days.prev.push({
          day: moment().year(current.year).month(prevMonth).date(i).format('D'),
          key: "prev"+i,
        });
      }
    }
    for (let i = 1, daysLeft = daysToStartOfCal + 35; i < daysLeft; i++) {
      if (i <= moment().daysInMonth()){
        days.current.push({
          day: moment().year(current.year).month(current.month).date(i).format('D'),
          key: "current"+i
        });
      }
      else {
        days.next.push({
          day: moment().year(current.year).month(current.month).date(i).format('D'),
          key: "next"+i
        });
      }
    }
    return days;
  }

  render() {
    let days = (
      <Days days={this.getDays()} currentDate={this.state.currentDate} key="days"/>
    );
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
          {days}
        </div>
      </div>
    );
  }
}

export default Calendar;

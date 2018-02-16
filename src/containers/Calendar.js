import React, { Component } from 'react';
import classes from './Calendar.css';
import Month from '../components/Year/Month/Month';
import Year from '../components/Year/Year';
import DayNames from '../components/Year/Month/Days/DayNames/DayNames';
import Days from '../components/Year/Month/Days/Days';
import MonthButtons from '../components/Year/Month/MonthButtons/MonthButtons';

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
    console.log(currentDate);
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
      let prevMonth = +current.month - 1;
      let prevYear = current.year - 1;
      daysToStartOfCal = current.firstofMonth - current.day;
      console.log("   current month "+moment().month(+current.month).format('MMMM'));  
      if (+current.month === 0) {
        prevMonth = moment().month(prevMonth).format('MMMM');
        console.log("   prevMonth: " + moment().month(prevMonth).format('MMMM'));
        console.log("   prevYear: " + prevYear);
        console.log(daysToStartOfCal);

        days.prev = this.populateDays(days.prev, daysToStartOfCal, prevYear, prevMonth, "prev");
      }
      else {
        console.log("prevMonth: "+prevMonth);
        days.prev = this.populateDays(days.prev, daysToStartOfCal, current.year, prevMonth, "prev");
      }
    }
    console.log("   prev month days:");
    console.log(days);
    for (let i = 1, daysLeft = daysToStartOfCal + 42; i < daysLeft; i++) {
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

  populateDays = (days, daysToStartOfCal, year, month, key) => {
    console.log("in populate Days");
    console.log("   year: " + year + " month: " + month);
    console.log("   daysToStartOfCal: " + daysToStartOfCal);  
    if (daysToStartOfCal === 0) {
      daysToStartOfCal = moment().month(month).daysInMonth();
      days.push({
        day: moment().year(year).month(month).date(daysToStartOfCal).format('D'),
        key: key+0,
      });
    }
    else {
      for (let i = daysToStartOfCal; i < 1; i++) { // get rolling dates from previous month
        days.push({
          day: moment().year(year).month(month).date(i).format('D'),
          key: key+i,
        });
      }
    }
    console.log(days);
    return days;
  }

  changeMonthHandler = (buttonType) => {
    console.log("change month handler");
    this.setState((prevState) => {
      let currentDate = {...prevState.currentDate};
      if (buttonType === 'up') {
        currentDate = this.clickedPrevMonth(currentDate);
        return {currentDate: currentDate};
      }
    });
  }

  clickedPrevMonth = (currentDate) => {
    console.log(currentDate.month);
    if (currentDate.month === 0) {
      currentDate.year = currentDate.year-1;
      currentDate.month = 11;
      currentDate.day = null;
      return currentDate;
    }
    else {
      currentDate.month = currentDate.month-1;
      console.log(currentDate.month);
      currentDate.day = null;
      console.log(currentDate);
      return currentDate;
    }
  }

  render() {
    console.log("render");
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
          <div className={classes.MonthButtons}>
            <MonthButtons changeMonth={this.changeMonthHandler} />
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

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

    // first day of the current month
    const firstOfMonth = moment().year(currentDate.year).month(currentDate.month).date(1);
    const firstDayOfMonth = firstOfMonth.day();
    const current = {
      year: currentDate.year,
      month: "0"+(currentDate.month),
      firstOfMonth: "01",
      day: firstDayOfMonth
    };
    let daysOfPrevMonth = 0;

    if (current.day !== 0){ // current Month's first day is not a sunday
      let prevMonth = +current.month - 1;
      //console.log(current.day);
      daysOfPrevMonth = current.day - current.firstOfMonth;
      if (+current.month === 0) { // if current month is January
        let prevYear = current.year - 1;
        days.prev = this.getRollingDays(
          days.prev, 
          daysOfPrevMonth, 
          prevYear, 
          prevMonth, 
          "prev"
        );
      }
      else {
        console.log("prevMonth: "+prevMonth);
        days.prev = this.getRollingDays(
          days.prev, 
          daysOfPrevMonth, 
          current.year, 
          prevMonth, 
          "prev"
        );
      }
    }
    days.current = this.getCurrentDays(current.month, days.current, "current");
    let remainingDays = 42 - (days.current.length + days.prev.length);
    days.next = this.getRollingDays(
      days.next, 
      remainingDays, 
      current.year, 
      +current.month+1,
      "next"
    );
    return days;
  }

  getRollingDays = (days, daysOfRollingMonth, year, month, key) => {
    let daysInMonth = moment().month(month).daysInMonth();
    if (key === "prev") {
      let rollingDays = daysInMonth - daysOfRollingMonth;
      // get rolling dates from previous month
      for (let i = 0; i <= daysOfRollingMonth; i++) { 
        days.push({
          day: rollingDays++,
          key: key+i,
        });
      }
      return days;
    }
    else { // get rolling dates for next month
      for (let i = 1; i <= daysOfRollingMonth; i++) {
        days.push({
          day: i,
          key: key+i
        });
      }
      return days;
    }
  }

  getCurrentDays = (month, days, key) => {
    let daysInMonth = moment().month(month).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        key: key+i
      });
    }
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
      else {
        currentDate = this.clickedNextMonth(currentDate);
        return {currentDate: currentDate};
      }
    });
  }

  clickedPrevMonth = (currentDate) => {
    console.log("   current month: "+currentDate.month);
    if (currentDate.month === 0) { // if the current month is Jan, subtract a year and set the month to Dec.
      currentDate.year = currentDate.year-1;
      currentDate.month = 11;
      currentDate.day = null;
      return currentDate;
    }
    else {
      currentDate.month = currentDate.month-1;
      console.log("   prev month: "+currentDate.month);
      currentDate.day = null;
      return currentDate;
    }
  }

  clickedNextMonth = (currentDate) => {
    console.log("   current month: "+currentDate.month);
    if (currentDate.month === 11) { // if the current month is Dec, add to year and set month to jan.
      currentDate.year = +currentDate.year+1;
      currentDate.month = 0;
      currentDate.day = null;
      return currentDate;
    }
    else {
      currentDate.month = +currentDate.month+1;
      console.log("   next month: "+currentDate.month);
      currentDate.day = null;
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

import React, { Component } from 'react';

import classes from './Calendar.css';

import Auxiliary from '../hoc/Auxiliary/Auxiliary';
import Month from '../components/Year/Month/Month';
import Year from '../components/Year/Year';
import DayNames from '../components/Year/Month/Days/DayNames/DayNames';
import Days from '../components/Year/Month/Days/Days';
import MonthButtons from '../components/Year/Month/MonthButtons/MonthButtons';
import Modal from '../components/UI/Modal/Modal';
import Events from '../components/Events/Events';

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
    },
    showingEvent: false,
    eventDate: {
      year: CURRENT_DATE().year,
      month: CURRENT_DATE().month-1,
      day: CURRENT_DATE().day,
      compiled: null
    },
    eventKey: 0,
    newEvent: "new event",
    allEvents: [
      {
        date: "2-21-2018",
        events: [
          {key: 23, event: "it is wednesday my dudes"}
        ]
      },
      {
        date: "2-22-2018",
        events: [
          {key: 25, event: "blah blah"}, 
          {key: 26, event: "herp" }
        ]
      }
    ]
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
      month: currentDate.month,
      firstOfMonth: "01",
      day: firstDayOfMonth
    };
    let daysOfPrevMonth = 0;

    if (current.day !== 0){ // current Month's first day is not a sunday
      let prevMonth = +current.month - 1;
      //console.log(current.day);
      daysOfPrevMonth = current.day - current.firstOfMonth;
      if (current.month === 0) { // if current month is January
        let prevYear = current.year - 1;
        days.prev = this.getRollingDays(
          days.prev, 
          daysOfPrevMonth, 
          prevYear, 
          prevMonth, 
          "prev"
        );
      } else {
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
    days.current = this.getCurrentDays(current.year, current.month, days.current, "current");
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
          month: month,
          year: year,
          key: key+i,
        });
      }
      return days;
    } else { // get rolling dates for next month
      for (let i = 1; i <= daysOfRollingMonth; i++) {
        days.push({
          day: i,
          month: month,
          year: year,
          key: key+i
        });
      }
      return days;
    }
  }

  getCurrentDays = (year, month, days, key) => {
    let daysInMonth = moment().month(month).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: month,
        year: year,
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

  showEventHandler = (eventDate) => {
    console.log("in showEventHandler");
    console.log(eventDate);
    const compiled = (eventDate.month+1)+"-"+eventDate.day+"-"+eventDate.year;
    console.log("compiled: "+ compiled);
    this.setState({
      showingEvent: true,
      eventDate: {
        year: eventDate.year,
        month: eventDate.month,
        day: eventDate.day,
        compiled: compiled
      }
    });
  }

  eventChangedHandler = (event) => {
    console.log("event description: " + event.target.value);
    this.setState({
      newEvent: event.target.value
    })
  }

  addEventHandler = () => {
    console.log("event:");
    console.log(this.state.newEvent);
    
    this.setState((prevState) => {
      let eventDate = prevState.eventDate.compiled;
      let eventDescription = prevState.newEvent;
      let newEvents = [...prevState.allEvents];
      let eventKey = prevState.eventKey;
      console.log("in state event date: " + eventDate);
      console.log("new Events " );
      console.log(newEvents);

      let dateIndex = this.getEventDateIndex(newEvents);
      console.log("date index: " + dateIndex);
      eventKey++;
      if (dateIndex !== null) {
        console.log(newEvents[dateIndex].date);
        newEvents[dateIndex].events.push({
          key: eventKey, event: eventDescription
        });
      } else {
        newEvents.push({
          date: eventDate,
          events: [{key: eventKey, event: eventDescription}]
        });
      }
      console.log(newEvents);
      return ({
        events: newEvents,
        eventKey: eventKey,
      });
    });
  }

  getEventDateIndex = (events) => {
    for (let i = 0, l = events.length; i < l; i++) {
      if (events[i].date === this.state.eventDate.compiled) {
        return i;
      }
    }
    return null;
  }

  render() {
    console.log("render");
    let days = (
      <Days 
        showEvent={this.showEventHandler}
        days={this.getDays()} 
        currentDate={this.state.currentDate} 
        key="days"/>
    );

    return (
      <Auxiliary>
        <div className={classes.Calendar}>
          <Modal show={this.state.showingEvent}>
            <Events 
              date={this.state.eventDate}
              addEvent={this.addEventHandler} 
              newEvent={this.state.newEvent}
              events={this.state.allEvents} >
                <form >
                  <label>
                      Event: 
                      <input 
                        type="text" 
                        value={this.state.newEvent}
                        onChange={event => this.eventChangedHandler(event)} />
                  </label>
                  <button onClick={this.addEventHandler} >Add Event</button>
                </form>
            </Events>
          </Modal>
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
      </Auxiliary>
    );
  }
}

export default Calendar;

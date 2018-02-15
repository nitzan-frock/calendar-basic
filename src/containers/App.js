import React, { Component } from 'react';
import './App.css';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <div className={classes.MonthYear}>
          <p>Month Year</p>
        </div>
        <div className={classes.DayNames}>
          <p>DayNames</p>
        </div>
        <div className={classes.Days}>1</div>
        <div className={classes.Days}>2</div>
      </div>
    );
  }
}

export default App;

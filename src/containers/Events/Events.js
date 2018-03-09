import React, { Component } from 'react';
import firebase from 'firebase';
import classes from './Events.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import getToday from '../../components/Year/Month/Days/Day/Today/getToday';
import EventForm from '../../components/UI/EventForm/EventForm';
import Event from '../../components/Event/Event';
import Cookies from 'universal-cookie';

const moment = require('moment');
const cookies = new Cookies();

class Events extends Component {
    state = {
        description: "",
        events: [],
    };

    componentWillMount () {
        let events = [];
        if (cookies.get('events')) {
            events = cookies.get('events');
        }
        this.setState({
            events: events
        });
    }

    componentWillUpdate () {
        console.log("[componentWillUpdate]");
        if (!this.props.showEvents) {
            if (this.state.description){
                this.setState({description: "" });
            }
        }

        if (this.props.userId !== "anon") {
            const rootRef = firebase.database().ref('users');

            if (rootRef === null) {
                rootRef.set(this.props.userId);
            }
            const eventRef = rootRef.child('event');
            eventRef.on('value', snap => {
            });
        } else {

        }
    }

    eventChangedHandler = (event) => {
        this.setState({
            description: event.target.value
        });
    }

    eventEnterPressedHandler = (event) => {
        if (event.key === "Enter") {
          this.addEventHandler();
        }
    }

    addEventHandler = () => {
        console.log("[addEventHandler]");

        this.setState((prevState) => {
            let eventDate = this.props.eventDate.compiled;
            let description = prevState.description;
            let events = [...prevState.events];
            let dateIndex = this.getEventDateIndex(events);

            let eventKey = Math.floor(Math.random()*100000);
            if (dateIndex !== null) {
                events[dateIndex].events.push({
                    key: eventKey, event: description
                });
            } else {
                events.push({
                    date: eventDate,
                    events: [{ key: eventKey, event: description }]
                });
            }

            if (this.props.userId === "anon") {
                this.setCookie(events);
            }

            return ({
                events: events,
                description: "",
            });
        });
    }

    getEventDateIndex = (events) => {
        for (let i = 0, l = events.length; i < l; i++) {
            if (events[i].date === this.props.eventDate.compiled) {
                return i;
            }
        }

        return null;
    }

    eventControlClickedHandler = (key) => {
        this.setState(prevState => {
            let events = [...prevState.events];
            const eventDateIndex = this.getEventDateIndex(events)

            events[eventDateIndex].events = this.deleteEvent(events[eventDateIndex].events, key);

            if (this.props.userId === "anon") {
                this.setCookie(events);
            }

            return {events: events}
        });
    }

    deleteEvent = (dayEvents, key) => {
        console.log("in delete event");
        console.log("OG KEY: " + key);
        for(let i = 0, l = dayEvents.length; i < l; i++) {
            if (dayEvents[i].key === key) {
                dayEvents.splice(i,1);
                return dayEvents;
            }
        }
    }

    setCookie = (events) => {
        let d = new Date();
        let timeForday = 24*60*60*1000;
        d.setTime(d.getTime()+timeForday);

        cookies.set('events', events, { path: '/', expires: d });
    }

    render() {
        // define date clicked for the event Day, Month #, YYYY
        const dateObj = getToday(this.props.eventDate);

        // get event date in format of MM-DD-YYYY
        let eventDate = (+moment().month(dateObj.month).format('MM')) + "-" + dateObj.day + "-" + dateObj.year;

        let displayEvents = <p>No Events.</p>

        if (this.state.events.length > 0) {
            // iterate for selected date's events
            this.state.events.map(date => {
                const existingEventDate = date.date;
                if (existingEventDate === eventDate && date.events.length > 0) {
                    displayEvents = date.events.map(event => {
                        return (
                            <Event 
                                event={event.event} 
                                key={event.key} 
                                controlKey={event.key}
                                eventControlClicked={this.eventControlClickedHandler} />
                        );
                    });
                    return displayEvents
                } else {
                    return null;
                }
            });
        }

        return (
            <Auxiliary>
                <h3>{dateObj.compiledString}</h3>
                <div className={classes.Events}>
                    {displayEvents}
                </div>
                <EventForm 
                    eventChanged={this.eventChangedHandler}
                    eventAdded={this.addEventHandler}
                    enterPressed={this.eventEnterPressedHandler}
                    value={this.state.description}/>
            </Auxiliary>
        );
    }
}

export default Events;
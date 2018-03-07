import React, { Component } from 'react';
import firebase from 'firebase';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import getToday from '../../components/Year/Month/Days/Day/Today/getToday';
import EventForm from '../../components/UI/EventForm/EventForm';

const moment = require('moment');

class Events extends Component {
    state = {
        eventKey: 0,
        description: "",
        events: []
    };

    componentDidUpdate () {
        console.log("[componentDidUpdate]");
        if (!this.props.showEvents) {
            if (this.state.description){
                this.setState({description: "" });
                console.log(this.state.events);
            }
        }

        const rootRef = firebase.database().ref().child('events');
        const eventRef = rootRef.child('event');
        eventRef.on('value', snap => {

        });
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
            let eventKey = prevState.eventKey;
            let dateIndex = this.getEventDateIndex(events);

            eventKey++;
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

            return ({
                events: events,
                description: "",
                eventKey: eventKey,
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

    render() {
        // define date clicked for the event
        const dateObj = getToday(this.props.eventDate);

        // get event date in format of MM-DD-YYYY
        let eventDate = (+moment().month(dateObj.month).format('MM')) + "-" + dateObj.day + "-" + dateObj.year;

        let displayEvents = <p>No Events.</p>

        if (this.state.events.length > 0) {
            this.state.events.map(date => {
                const existingEventDate = date.date;
                if (existingEventDate === eventDate) {
                    displayEvents = date.events.map(event => {
                        return (<p key={event.key}>- {event.event}</p>);
                    });
                    return displayEvents
                } else {
                    return null;
                }
            });
        }

        return (
            <Auxiliary>
                <h2>Events</h2>
                <h3>{dateObj.compiledString}</h3>
                {displayEvents}
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
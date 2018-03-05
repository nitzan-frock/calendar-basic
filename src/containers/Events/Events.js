import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import getToday from '../Year/Month/Days/Day/Today/getToday';
import EventForm from '../../components/UI/EventForm/EventForm';

const moment = require('moment');

class Events extends Component {
    state = {
        eventDate: {
            year: CURRENT_DATE().year,
            month: CURRENT_DATE().month - 1,
            day: CURRENT_DATE().day,
            compiled: null
        },
        eventKey: 0,
        newEvent: "",
        allEvents: []
    };

    showEventsHandler = (eventDate) => {
        const compiled = (eventDate.month + 1) + "-" + eventDate.day + "-" + eventDate.year;
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
        this.setState({
            newEvent: event.target.value
        });
    }

    addEventHandler = () => {
        this.setState((prevState) => {
            let eventDate = prevState.eventDate.compiled;
            let eventDescription = prevState.newEvent;
            let newEvents = [...prevState.allEvents];
            let eventKey = prevState.eventKey;
            let dateIndex = this.getEventDateIndex(newEvents);

            eventKey++;
            if (dateIndex !== null) {

                newEvents[dateIndex].events.push({
                    key: eventKey, event: eventDescription
                });
            } else {
                newEvents.push({
                    date: eventDate,
                    events: [{ key: eventKey, event: eventDescription }]
                });
            }
            return ({
                allEvents: newEvents,
                newEvent: "",
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
        // define date clicked for the event
        const dateObj = getToday(props.date);

        // get event date in format of MM-DD-YYYY
        let eventDate = (+moment().month(dateObj.month).format('MM')) + "-" + dateObj.day + "-" + dateObj.year;

        let displayEvents = <p>No Events.</p>

        if (props.events.length > 0) {
            props.events.map(date => {
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
                    value={this.state.newEvent}/>
            </Auxiliary>
        );
    }
}

export default Events;
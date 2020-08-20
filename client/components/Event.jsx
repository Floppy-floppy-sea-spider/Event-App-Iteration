import React from 'react';
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import location from '../assets/location.png';
import { Container, Jumbotron, Button } from 'react-bootstrap';

export default function Event(props) {
  const handleClick = (e) => {
    e.preventDefault();

<<<<<<< HEAD
    const eventDetails = props;
    console.log(eventDetails);

    fetch('http://localhost:3000/api/calendar', {
      method: 'POST',
      body: JSON.stringify(eventDetails),
      headers: { 'Content-Type': 'application/json' },
      // credentials: 'include',
    })
      .then((response) => response.json())
      .then((link) => window.open(link, '_blank'));
=======
    // console.log('google api key', process.env.Google_Calendar_API);
    // console.log('google client id', process.env.Client_ID);

    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: 'AIzaSyB6yrukbK84V5RazOUd1AJvTn5qMcoeoxs',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        clientId:
          '580748962931-63i8t6oie0r8d4k4gnaf8rrjfuk4jh0o.apps.googleusercontent.com',
        scope: 'https://www.googleapis.com/auth/calendar.events',
      });

      gapi.client.load('calendar', 'v3', () => console.log('loaded calendar!'));

      gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(() => {
          console.log('signed in');

          const event = {
            summary: props.eventtitle,
            location: props.eventlocation,
            description: props.eventdetails,
            start: {
              dateTime: props.raweventstarttime,
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: props.raweventendtime,
              timeZone: 'America/Los_Angeles',
            },
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'email', minutes: 24 * 60 },
                { method: 'popup', minutes: 10 },
              ],
            },
          };
          console.log('EVENT object', event);

          const request = gapi.client.calendar.events.insert({
            calendarId: 'primary',
            resource: event,
          });

          request.execute(function (event) {
            window.open(event.htmlLink, '_blank');
          });
        })
        .catch((err) => console.log(err));
    });
>>>>>>> comments
  };

  return (
    <div>
      <b className="hr anim"></b>
      <div className="event">
        <Container>
          <Jumbotron fluid>
            <Container className="eventJumbotron">
              <h1>{props.eventtitle}</h1>
              <h4>
                {props.eventstarttime} - {props.eventendtime}
              </h4>
              <h4>
                <img src={location} height="30px" width="30px" /> Location:
                {` ${props.eventlocation}`}
              </h4>
              <p>{props.eventdetails}</p>
              <Button
                variant="info"
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                Add to Google Calendar
              </Button>
            </Container>
          </Jumbotron>

          <Container>
            <EventAttendees {...props} userUpdate={props.userUpdate} />
          </Container>
          <Content user={props.user} eventtitle={props.eventtitle} {...props} />
        </Container>
      </div>
    </div>
  );
}

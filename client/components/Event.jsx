import React from 'react';
import EventAttendees from './EventAttendees.jsx';
import Content from './Content.jsx';
import location from '../assets/location.png';
import { Container, Jumbotron, Button } from 'react-bootstrap';

export default function Event(props) {
  const handleClick = (e) => {
    e.preventDefault();

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

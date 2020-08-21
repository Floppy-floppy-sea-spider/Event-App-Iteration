import React from 'react';
import Event from './Event.jsx';

export default function EventsFeed(props) {
  let events = [];
  // creates events for each event in feed
  if (props.events && Object.keys(props.events).length) {
    events = props.events.map((event, index) => (
      <Event
        {...event}
        user={props.user}
        userUpdate={props.userUpdate}
        key={`EventsFeed${index}`}
      />
    ));
  }
  return (
    <div className="events">
      {events}
    </div>
  );
}

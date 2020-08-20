import React, { useState, useEffect } from 'react';
import Profile from './Profile.jsx';
import EventsFeed from './EventsFeed.jsx';
import Notnav from './Navbar.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Card, Button, Col, Row, Container } from 'react-bootstrap';
import AddSearchEvent from './AddSearchEvent.jsx';

// Implemented with hooks throughout
export default function MainContainer() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({});
  const [events, setEvents] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogIn(username) {
    setUserName(username);
    setLoggedIn(true);

    console.log('userName in handleLogIn is: ', userName);
    console.log('loggedIn in handleLogIn is: ', loggedIn);
  }

  function handleLogOut() {
    setUserName('');
    Cookies.remove('user');
    Cookies.remove('userName');
    setLoggedIn(false);
    setUser({});
    setEvents([]);
  }

  //pull user data after OAuth login - all variables are named from SQL DB columns

  useEffect(() => {
    // console.log('I am in useEffect!');
    // console.log('userName in useEffect is: ', userName);
    // console.log('loggedIn in useEffect is: ', loggedIn);
    const cookiesUserName = Cookies.get('userName');
    if (cookiesUserName) {
      getInfo(cookiesUserName);
    } else if (userName.length > 1) {
      getInfo(userName);
    }

    function getInfo(user) {
      axios.get(`/api/info?userName=${user}`).then((res) => {
        let userInfo = {
          username: res.data.users.username,
          firstname: res.data.users.firstname,
          lastname: res.data.users.lastname,
          profilephoto: res.data.users.profilephoto,
        };
        let eventsInfo = res.data.events;
        setUser(userInfo);
        setEvents(eventsInfo);
        setUserName(res.data.users.username);
      });
    }
  }, [loggedIn]);
  //updates username when a different user is selected
  function handleUserPageChange(username) {
    setUserName(username);
  }
  // handles the state change and posts to database on event creation
  function handleCreateEvent(event) {
    let {
      eventtitle,
      eventlocation,
      raweventstarttime,
      raweventendtime,
      eventstarttime,
      eventendtime,
      eventdetails,
    } = event;
    axios
      .post(`/api/create?userName=${userName}`, {
        eventtitle,
        eventlocation,
        raweventstarttime,
        raweventendtime,
        eventstarttime,
        eventendtime,
        eventdetails,
      })
      .then((res) => {});
    event.attendees = [
      {
        username: user.username,
        profilephoto: user.profilephoto,
      },
    ];
    const newEvents = [event].concat(events);
    setEvents(newEvents);
  }
  // handles the state change and posts to database on search event add
  function handleSearchEvent(event) {
    // ADD
    axios.post(`/api/add?eventtitle=${event.eventtitle}`).then((res) => {
      event.attendees.push({
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        profilephoto: user.profilephoto,
      });
      const newEvents = [event].concat(events);
      setEvents(newEvents);
    });
  }

  return (
    <div className="myContainer">
      <Notnav
        handleStatusChange={handleLogIn}
        userName={userName}
        handleLogOut={handleLogOut}
      />
      <div className="container">
        <Container className="header">
          <Profile {...user} />
          <AddSearchEvent
            addEvent={handleCreateEvent}
            searchEvent={handleSearchEvent}
            events={events}
          />
        </Container>
        <EventsFeed events={events} userUpdate={handleUserPageChange} />
      </div>
    </div>
  );
}

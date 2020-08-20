import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import plus from '../assets/plus.png';
import { Modal, Button, Form } from 'react-bootstrap';

export default function CreateEvent({ addEvent }) {
  const initialFormData = Object.freeze({
    eventtitle: '',
    eventlocation: '',
    eventdetails: '',
  });

  const [formData, updateFormData] = useState(initialFormData);
  const [rawStartTime, changeStart] = useState(new Date());
  const [rawEndTime, changeEnd] = useState(new Date());
  const [show, setShow] = useState(false);
  // handles any change tot he form and updates the state
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  // handles submit event - create date and time and append to the event object
  const handleSubmit = (e) => {
    e.preventDefault();
    const eventstarttime = rawStartTime.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: true,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    const eventendtime = rawEndTime.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: true,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    // const eventdate = dateTime.toDateString();
    // let time = dateTime.toTimeString();
    // let eventstarttime = time.split(" ")[0];
    // ... submit to API or something
    // addEvent function is in MainContainer.js line 34
    addEvent({
      ...formData,
      raweventstarttime: rawStartTime,
      raweventendtime: rawEndTime,
      eventstarttime,
      eventendtime,
    });
    handleClose();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div className="cardContainer" onClick={handleShow}>
        <img src={plus} height="65px" width="65px" />
        <p>Add Event</p>
      </div>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group controlId="formEventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                name="eventtitle"
                onChange={handleChange}
                required
                type="text"
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group controlId="formEventLocation">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="eventlocation"
                onChange={handleChange}
                required
                type="text"
                placeholder="Enter address"
              />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                name="eventdetails"
                onChange={handleChange}
                required
                as="textarea"
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>Start Date & Time</Form.Label>
              <DateTimePicker onChange={changeStart} value={rawStartTime} />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label>End Date & Time</Form.Label>
              <DateTimePicker onChange={changeEnd} value={rawEndTime} />
            </Form.Group>

            {/* invite attendees?? */}
            {/* recurring event? other options?? */}

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

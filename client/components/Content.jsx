import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Content(props) {
  const [messages, setMessages] = useState(props.eventmessages);
  const [comment, setComment] = useState('');
  const [user] = useState(props.user);

  const messageFeed = messages.map((message, i) => (
    <div key={`message${i}`}>
      <div className="message">
        <img src={user.profilephoto} height='30px' width='30px'/>
        <p><b>{`${user.firstname} ${user.lastname}`}</b></p>
        <p className="timeStamp">{message.time}</p>
      </div>
      {message.text}
      <hr />
    </div>
  ));

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  // handles submit event - creates time stamp - does not submit to database....yet
  function handleCommentSubmit(e) {
    e.preventDefault();
    let date = new Date();
    const options = { hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'long', day: 'numeric' };
    date = date.toLocaleDateString('en-US', options);
    if (comment.length) {
      const newMessages = [...messages];
      newMessages.push({ text: comment, time: date });
      setMessages(newMessages);
      setComment('');
    }
  }

  return (
    <div className="eventContent">
      <h4>Comments</h4>
      <div className="messageFeed">{messageFeed}</div>
      <Form name="comment-form">
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Add a Comment:</Form.Label>
          <Form.Control as="textarea" rows="2" onChange={handleChange} />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            handleCommentSubmit(e);
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

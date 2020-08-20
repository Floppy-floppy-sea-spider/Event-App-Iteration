import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Content(props) {
  const [messages, setMessages] = useState(props.eventmessages);
  const [comment, setComment] = useState('');
  const [user] = useState(props.user);
  console.log(messages);
  const messageFeed = messages.map((message, i) => (
    <div key={`message${i}`}>
      <div className="message">
        <img src={message.photo} height='30px' width='30px'/>
        <p><b>{message.name}</b></p>
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
      const updatedMessages = [...messages];
      updatedMessages.push({
        text: comment,
        time: date,
        photo: user.profilephoto,
        name: `${user.firstname} ${user.lastname}`,
      });

      const data = { updatedMessages};
      axios.patch(`/api/addComment/?eventtitle=${props.eventtitle}`, data)
        .then((res) => {
          setMessages(updatedMessages); // setMessages on 200 status from server
          console.log(res);
        })
        .catch((err) => { console.log(err); });
      setComment('');
      document.getElementsByName('comment-form')[0].reset();
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

import React, { useState } from 'react';
import './Feedback.css';
import { Link } from "react-router-dom";
import back from "../images/back.png";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // Add the new feedback to the list
    const newFeedback = { name, email, message };
    setFeedbacks([...feedbacks, newFeedback]);

    // Clear the input fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="feedback-container">
      <Link to="/" className="back-button" >
        <img src={back} width="10%"/>
      </Link>
    <div className="feedback-page">
        
      <h2>Feedback</h2>

      {/* Feedback Form */}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
        />

        <label htmlFor="message">Feedback</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Feedback"
        />

        <button type="submit">Submit</button>
      </form>

      {/* Display Feedbacks
      <div className="feedback-list">
        <h3>Submitted Feedback</h3>
        {feedbacks.length === 0 ? (
          <p>No feedback yet.</p>
        ) : (
          feedbacks.map((feedback, index) => (
            <div className="feedback-item" key={index}>
              <h4>{feedback.name}</h4>
              <p>{feedback.message}</p>
              <span>{feedback.email}</span>
            </div>
          ))
        )}
      </div> */}
    </div>
    </div>
  );
};

export default Feedback;

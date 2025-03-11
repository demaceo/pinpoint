import React, { useState } from "react";
import "./ContactForm.css";
const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form className="contact-form">
      <input
        className="contact-email"
        placeholder="Your Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className="contact-message"
        placeholder="Your Message"
        value={message}
        required
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="contact-button" disabled={!email || !message}>
        Send
      </button>
    </form>
  );
};

export default ContactForm;

import React, { useEffect, useState } from "react";
import "./ContactForm.css";
import { ContactFormProps } from "../../assets/types";

const ContactForm: React.FC<ContactFormProps> = ({ official, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    setReceiver(official.email || "");
  }, [official]);
  
  console.log(receiver);

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
      <button
        className="contact-button"
        disabled={!email || !message}
        onClick={onClose}
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;

import React, { useState } from "react";
import "./ContactForm.css";

interface ContactFormProps {
  selectedEmails: string[];
  onClose: () => void;
  onRemoveEmail: (email: string) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  selectedEmails,
  onClose,
  onRemoveEmail,
}) => {
  const [message, setMessage] = useState("");

  // Auto-generate greeting for selected officials
  const generateGreeting = () => {
    return selectedEmails
      .map((email) => {
        const name = email.split("@")[0].replace(".", " "); // Extract name from email
        return `Dear ${name.charAt(0).toUpperCase() + name.slice(1)},`;
      })
      .join("\n\n");
  };

  // Initialize message when form opens
  useState(() => {
    setMessage(generateGreeting() + "\n\n");
  });

  return (
    <div className="contact-form-container">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <h2>Compose Email</h2>

      {/* Display Selected Emails with 'X' Button */}
      <div className="email-list">
        {selectedEmails.map((email, index) => (
          <span key={index} className="email-tag">
            {email} <button onClick={() => onRemoveEmail(email)}>✖</button>
          </span>
        ))}
      </div>

      {/* Message Input */}
      <textarea
        className="message-box"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />

      {/* Send Button */}
      <button className="send-btn" disabled={selectedEmails.length === 0}>
        Send Email
      </button>
    </div>
  );
};

export default ContactForm;

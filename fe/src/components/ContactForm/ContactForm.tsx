import React, { useEffect, useState } from "react";
import "./ContactForm.css";
import { Official, ContactFormProps } from "../../assets/types";
import Button from "../Button/Button";

const ContactForm: React.FC<ContactFormProps> = ({
  selectedEmails,
  selectedOfficials,
  onClose,
  onRemoveEmail,
}) => {
  const [message, setMessage] = useState("");
  const [filteredOfficials, setFilteredOfficials] =
    useState<Official[]>(selectedOfficials);

  const generateGreeting = (officials: Official[]) => {
    const formattedOfficials = officials.map(
      (official) => `${official.current_role.title} ${official.name}`
    );

    if (formattedOfficials.length === 0) return "";

    if (formattedOfficials.length === 1)
      return `Dear ${formattedOfficials[0]},\n\n`;

    return `Dear ${formattedOfficials
      .slice(0, -1)
      .join(", ")}, and ${formattedOfficials.slice(-1)},\n\n`;
  };

  useEffect(() => {
    setMessage(generateGreeting(filteredOfficials));
  }, [filteredOfficials]);

  const handleRemoveEmail = (email: string) => {
    onRemoveEmail(email);

    const updatedOfficials = filteredOfficials.filter(
      (official) => official.email !== email
    );
    setFilteredOfficials(updatedOfficials);
  };

  return (
    <>
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      <h2>Compose Email</h2>
      <div className="email-list">
        {selectedEmails.map((email, index) => (
          <span key={index} className="email-tag">
            {email} <button onClick={() => handleRemoveEmail(email)}>✖</button>
          </span>
        ))}
      </div>

      {/* Message Input */}
      <h3>Your Drafted Message:</h3>
      <textarea
        className="message-box"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />

      {/* Send Button */}
      <Button
        label="send email"
        className="send-btn"
        onClick={() => console.log("send email clicked")}
        disabled={message === ""}
      />
    </>
  );
};

export default ContactForm;

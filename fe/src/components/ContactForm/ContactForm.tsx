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

  const createMailtoLink = () => {
    if (selectedEmails.length === 0) return "#";

    const emailRecipients = selectedEmails.join(",");
    const emailSubject = encodeURIComponent("Sincerely, A Concerned Voter");
    const emailBody = encodeURIComponent(message);

    return `mailto:${emailRecipients}?subject=${emailSubject}&body=${emailBody}`;
  };


  return (
    <>
      <button className="close-btn" onClick={onClose}>
        X{/* close */}
      </button>
      <h2>Compose Email</h2>
      <div className="email-list">
        {selectedEmails.map((email, index) => (
          <span key={index} className="email-tag">
            {email} <button onClick={() => handleRemoveEmail(email)}>✖</button>
          </span>
        ))}
      </div>

      <h3>Your Drafted Message:</h3>
      <textarea
        className="message-box"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />

      {/* <Button
        label="send email"
        className="send-btn"
        onClick={() => console.log("send email clicked")}
        disabled={message === ""}
      /> */}
      {/* ✅ "Send Email" Button as a mailto: link */}
      <a
        href={createMailtoLink()}
        className={`send-btn ${message === "" ? "disabled" : ""}`}
      >
        Send Email
      </a>
    </>
  );
};

export default ContactForm;

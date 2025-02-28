import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form className="p-4 border rounded">
      <input
        className="border p-2 w-full"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <textarea
        className="border p-2 w-full mt-2"
        placeholder="Your Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white p-2 mt-2 rounded"
        disabled={!email || !message}
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;

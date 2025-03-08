import React from "react";
import ContactForm from "../../components/ContactForm/ContactForm";
import './Contact.css'
const Contact: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Contact an Official</h1>
      <ContactForm />
    </div>
  );
};

export default Contact;

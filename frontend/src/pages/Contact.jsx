import React from "react";
import Header from "../components/contact/Header";
import ContactForm from "../components/contact/ContactForm";
import ContactInfoSidebar from "../components/contact/ContactInfoSidebar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-bg font-sans px-5 sm:px-7 lg:px-10 py-30">
      <Header />
      <main className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-10">
        <ContactForm />
        <ContactInfoSidebar />
      </main>
    </div>
  );
};

export default Contact;

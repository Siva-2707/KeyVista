import React, { useState } from "react";
import axios from "../api/axiosInstace"; // Adjust the import path as necessary

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post("/api/query", form);
    setSubmitted(true);
  } catch (err) {
    alert("Failed to send your message. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Contact Us</h1>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">General Contact Details</h2>
          <p className="mb-1"><span className="font-semibold">Email:</span> support@keyvista.com</p>
          <p className="mb-1"><span className="font-semibold">Phone:</span> +1 (902) 123-4567</p>
          <p><span className="font-semibold">Address:</span> 123 South Street, Suite 400, Halifax, NS B3K 1K3</p>
        </div>
        <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
        {submitted ? (
          <div className="text-green-600 font-semibold text-center py-8">
            Thank you for contacting us! We will get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-1 font-medium" htmlFor="name">Name</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
              <input
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="message">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
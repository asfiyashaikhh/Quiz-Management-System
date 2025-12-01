import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Footer from "../components/Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  };

  useEffect(() => {
    emailjs.init("dz8s84HdGU-JEVEiQ");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(false);

    // 🔹 Validation
    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields");
      return;
    }

    console.log("Sending email with data:", {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    });

    // 🔹 Send notification email to admin
    const adminEmail = emailjs.send(
      "service_7qruhzn",
      "template_pt1f0yq",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "dz8s84HdGU-JEVEiQ"
    );

    // 🔹 Send auto-reply to user
    const autoReply = emailjs.send(
      "service_7qruhzn",
      "template_ope4rcr",
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "dz8s84HdGU-JEVEiQ"
    );

    Promise.all([adminEmail, autoReply])
      .then((responses) => {
        console.log("Both emails sent successfully:", responses);
        setSent(true);
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.error("Email failed - Full error:", error);
        console.error("Error status:", error.status);
        console.error("Error text:", error.text);
        alert(
          `Failed to send message: ${
            error.text || error.message || "Unknown error"
          }`
        );
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1">
        <div className="d-flex justify-content-center align-items-center py-5">
          <div className="col-md-6">
            <div className="card p-4 shadow">
              <h3 className="mb-3 text-center">Contact Us</h3>
              <div
                className="mx-auto mt-1"
                style={{
                  height: "4px",
                  width: "100px",
                  borderRadius: "999px",
                  background: "linear-gradient(to right, #14b8a6, #3b82f6)",
                }}
              /><br></br>
              {sent && (
                <div className="alert alert-success">Message sent!</div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-primary">Send</button>
              </form>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default Contact;

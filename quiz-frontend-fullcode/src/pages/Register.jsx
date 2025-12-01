
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    prnNo: "",
    role: "STUDENT",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const regex = {
    name: /^[A-Za-z ]{3,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
    prnNo: /^[0-9]{12}$/,
  };

  const validate = () => {
    const newErrors = {};
    if (!regex.name.test(form.name)) newErrors.name = "Name should be 3-50 letters.";
    if (!regex.email.test(form.email)) newErrors.email = "Invalid email format.";
    if (!regex.password.test(form.password))
      newErrors.password = "Min 6 chars, at least 1 letter & 1 number.";
    if (!regex.prnNo.test(form.prnNo))
      newErrors.prnNo = "PRN should be of 12 digits.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axiosClient.post("/auth/register", form);
      setMessage("Registration successful. You can login now.");
    navigate("/login");                        
    }
     catch (err) {
      setMessage("Registration failed. " + (err.response?.data || ""));
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }} >
      <div className="col-md-6">
        <div className="card p-4 shadow">
          <h3 className="mb-3 text-center">Registration</h3>

           <div
              className="mx-auto mt-2"
              style={{
                height: "4px",
                width: "90px",
                align:"left",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            /><br></br>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">PRN Number</label>
              <input
                className={`form-control ${errors.prnNo ? "is-invalid" : ""}`}
                name="prnNo"
                value={form.prnNo}
                onChange={handleChange}
              />
              {errors.prnNo && <div className="invalid-feedback">{errors.prnNo}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="STUDENT">Student</option>
               
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

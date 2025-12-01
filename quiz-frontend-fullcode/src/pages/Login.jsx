

// // src/pages/Login.jsx
// import React, { useState } from "react";
// import axiosClient from "../api/axiosClient";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const validate = () => {
//     if (!form.email || !form.password) {
//       setError("Email and password are required.");
//       return false;
//     }
//     setError("");
//     return true;
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       const res = await axiosClient.post("/auth/login", form);
//       // {id, name, email, role, token}
//       login(res.data);

//       if (res.data.role === "ADMIN") {
//         navigate("/admin");
//       } else {
//         navigate("/student");
//       }
//     } catch (err) {
//       setError(err.response?.data || "Invalid credentials.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center"  style={{ minHeight: "80vh" }}>
//       <div className="col-md-4" >
//         <div className="card p-4 shadow" >
//           <h3 className="text-center mb-3">Sign In</h3>
//           {/* debug line – agar yeh bhi nahi dikhe, route hi nahi aa raha */}
        
//           <form onSubmit={handleSubmit} noValidate>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 className="form-control"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Enter email"
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Enter password"
              
//               />
//             </div>
//             <button className="btn btn-primary w-100" type="submit">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

/*  <p className="text-center text-muted" style={{ fontSize: "0.8rem" }}>
            (Login page loaded)
          </p>
          {error && <div className="alert alert-danger">{error}</div>} */





          // src/pages/Login.jsx
import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});       // field errors
  const [serverError, setServerError] = useState(""); // API error
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Email required
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else {
      // Simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    // Password required
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    setServerError("");

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));   // clear field error as user types
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axiosClient.post("/auth/login", form);
      // {id, name, email, role, token}
      login(res.data);

      if (res.data.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setServerError(err.response?.data || "Invalid email or password.");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-400"
    >
      <main className="flex-grow-1 d-flex justify-content-center align-items-center mt-5" >
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h3 className="text-center mb-3">Sign In</h3>
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

            {/* Server / API error */}
            {serverError && (
              <div className="alert alert-danger py-2">{serverError}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
<br></br>
              <button className="btn btn-primary w-100" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;

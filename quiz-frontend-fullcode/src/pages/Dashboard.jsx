import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

import dashboardLight from "../assets/dashboard-hero-light.jpeg";
import dashboardDark from "../assets/dashboard-hero-dark.png";


const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-400">
      {/* Main content */}
      <main className="flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <div className="container">
          <div className="row align-items-center">
            {/* LEFT: Text */}
            <div className="col-lg-6 mb-4">
              <h2 className="fw-bold mb-3 text-center">Quiz Management System</h2>
             <div
              className="mx-auto mt-3"
              style={{
                height: "4px",
                width: "270px",
                align:"left",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            /><br></br>
            <br></br>
              <p className="my-dark-text text-center">
                Welcome to the Quiz Management System, where you can
                easily explore available quizzes, manage your progress, and
                track your performance. Sign in or create a new account to
                begin your journey and unlock a seamless quiz experience
                tailored just for you.
              </p>
<br></br>
           <div className="d-flex justify-content-center gap-3 mt-4">
  <button
    className="btn btn-primary px-4"
    onClick={() => navigate("/login")}
  >
    Sign In
  </button>

  <button
    className="btn btn-outline-primary px-4"
    onClick={() => navigate("/register")}
  >
    Sign Up
  </button>
</div>
            </div>

            {/* RIGHT: Dark-mode aware image (via CSS) */}
            <div className="col-lg-6 text-center">
              {/* Light mode image */}
              <img
                src={dashboardLight}
                alt="Dashboard illustration light"
                className="img-fluid rounded shadow dashboard-img-light"
                style={{ maxHeight: "320px", objectFit: "cover" }}
              />
              {/* Dark mode image */}
              <img
                src={dashboardDark}
                alt="Dashboard illustration dark"
                className="img-fluid rounded shadow dashboard-img-dark"
                style={{ maxHeight: "320px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;

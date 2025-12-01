
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminDashboard = () => (
 <div className="d-flex flex-column min-vh-100">
    <main className="flex-grow-1">
 <div className="card p-4 shadow text-center">
    
    <h3>Admin Dashboard</h3>
    <div
              className="mx-auto mt-3"
              style={{
                height: "4px",
                width: "100px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            /><br></br>
    <p className="my-dark-text">
      Manage quizzes, students, and track student performance.
    </p>
    <div className="row mt-3">
      <div className="col-md-4 mb-3">
        <div className="card p-3 h-100">
          <h5>Manage Quizzes</h5>
          <p>Create, edit and delete quizzes.</p>
          <Link to="/admin/quizzes" className="btn btn-primary">
            Go to Quizzes
          </Link>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card p-3 h-100">
          <h5>Manage Students</h5>
          <p>View and manage registered students.</p>
          <Link to="/admin/students" className="btn btn-primary">
            Go to Students
          </Link>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card p-3 h-100">
          <h5>Student Performance</h5>
          <p>View quiz attempts and rankings.</p>
          <Link to="/admin/results" className="btn btn-primary">
            View Results
          </Link>
        </div>
      </div>
    </div>
    </div>
    </main>
  
  </div>
);

export default AdminDashboard;

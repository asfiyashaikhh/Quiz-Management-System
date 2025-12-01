import Footer from "../../components/Footer";
import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (

    <div className="d-flex flex-column min-vh-400">
       <main className="flex-grow-1">
    <div className="card p-4 shadow text-center">
      <h3>Student Dashboard</h3>
       <div
              className="mx-auto mt-2"
              style={{
                height: "4px",
                width: "120px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            />
            <br></br>
      <p className="text-muted">Welcome! Choose an option below.</p>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card p-3 h-100">
            <h5>Quizzes</h5>
            <p>View and attempt available quizzes.</p>
            <Link to="/student/quizzes" className="btn btn-primary">
              View Quizzes
            </Link>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 h-100">
            <h5>Marks</h5>
            <p>Check your quiz results.</p>
            <Link to="/student/results" className="btn btn-primary">
              View Marks
            </Link>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card p-3 h-100">
            <h5>Ranking</h5>
            <p>See your position on the leaderboard.</p>
            <Link to="/student/ranking" className="btn btn-primary">
              View Ranking
            </Link>
          </div>
        </div>
      </div>
    
    </div>
    </main>
   
    </div>
  );
};

export default StudentDashboard;


import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useAuth();
 const navigate = useNavigate();
 
  useEffect(() => {
    if (!user) return;
    axiosClient
      .get(`/student/quizzes?userId=${user.id}`)
      .then((res) => setQuizzes(res.data))
      .catch(() => {});
  }, [user]);

  return (
    <div className="card p-4 shadow text-center">
      <h3>Available Quizzes</h3><br></br>
      <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/student")}          // ✅ back
        >
           Student Dashboard
        </button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Duration (min)</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((q) => (
            <tr key={q.id}>
              <td>{q.title}</td>
              <td>{q.durationMinutes}</td>
              <td>{q.alreadyAttempted ? "Attempted" : "Not Attempted"}</td>
              <td>
                {!q.alreadyAttempted ? (
                  <Link
                    to={`/student/quiz/${q.id}`}
                    className="btn btn-sm btn-success"
                  >
                    Attempt
                  </Link>
                ) : (
                  <button className="btn btn-sm btn-secondary" disabled>
                    Attempted
                  </button>
                )}
              </td>
            </tr>
          ))}
          {quizzes.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No quizzes available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentQuizzes;

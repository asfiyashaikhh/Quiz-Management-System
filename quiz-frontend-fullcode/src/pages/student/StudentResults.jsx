
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom"; 

const StudentResults = () => {
  const [attempts, setAttempts] = useState([]);
  const { user } = useAuth();
   const navigate = useNavigate(); 
  useEffect(() => {
    if (!user) return;
    axiosClient
      .get(`/student/results?userId=${user.id}`)
      .then((res) => setAttempts(res.data))
      .catch(() => {});
  }, [user]);

  return (
    <div className="card p-4 shadow text-center">
      <h3>Your Results</h3><br></br>
       <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/student")}          // ✅ back
        >
         Student Dashboard
        </button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Score</th>
            <th>Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {attempts.map((a) => (
            <tr key={a.id}>
              <td>{a.quizTitle}</td>
              <td>{a.score}</td>
              <td>
                {a.completedAt
                  ? new Date(a.completedAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
          {attempts.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No attempts yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentResults;

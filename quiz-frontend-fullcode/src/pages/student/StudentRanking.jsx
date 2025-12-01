
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { Link, useNavigate } from "react-router-dom";

const StudentRanking = () => {
  const [ranking, setRanking] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    axiosClient
      .get("/student/ranking")
      .then((res) => setRanking(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="card p-4 shadow text-center">
      <h3>Overall Ranking</h3><br></br>
       <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/student")}          // ✅ back
        >
         Student Dashboard
        </button>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((r, index) => (
            <tr key={r.userId}>
              <td>{index + 1}</td>
              <td>{r.name}</td>
              <td>{r.totalScore}</td>
            </tr>
          ))}
          {ranking.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">
                No ranking data yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentRanking;

import { useNavigate } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const ViewResults = () => {
  const [attempts, setAttempts] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [loadingRanking, setLoadingRanking] = useState(false);
  const [errorAttempts, setErrorAttempts] = useState("");
  const [errorRanking, setErrorRanking] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoadingAttempts(true);
    axiosClient
      .get("/admin/results")
      .then((res) => setAttempts(res.data))
      .catch(() => setErrorAttempts("Failed to load student results."))
      .finally(() => setLoadingAttempts(false));

    setLoadingRanking(true);
    axiosClient
      .get("/student/ranking")
      .then((res) => setRanking(res.data))
      .catch(() => setErrorRanking("Failed to load ranking."))
      .finally(() => setLoadingRanking(false));
  }, []);

  return (
    <div className="card p-4 shadow text-center">
      
      <h3 className="mb-3">Student Performance & Ranking</h3><br></br>
 <button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin")}      // ✅ back button
        >
          Admin Dashboard
        </button> <br></br>
      <div className="mb-4">
        <h5>All Quiz Attempts</h5>
        <div
              className="mx-auto mt-2"
              style={{
                height: "4px",
                width: "100px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            />
<br></br>
        {errorAttempts && (
          <div className="alert alert-danger">{errorAttempts}</div>
        )}
        {loadingAttempts ? (
          <div>Loading attempts...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-sm">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Student</th>
                  <th>Quiz</th>
                  <th>Score</th>
                  <th>Completed At</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a, idx) => (
                  <tr key={a.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{a.studentName || a.name}</td>
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
                    <td colSpan="5" className="text-center">
                      No attempts yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <hr />
<br></br>
      <div>
        <h5>Overall Ranking</h5>

           <div
              className="mx-auto mt-2"
              style={{
                height: "4px",
                width: "100px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            />
<br></br>
        {errorRanking && (
          <div className="alert alert-danger">{errorRanking}</div>
        )}
        {loadingRanking ? (
          <div>Loading ranking...</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-sm">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Student</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {ranking.map((r, idx) => (
                  <tr key={r.userId || idx}>
                    <td>{idx + 1}</td>
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
        )}
      </div>
    </div>
  );
};

export default ViewResults;

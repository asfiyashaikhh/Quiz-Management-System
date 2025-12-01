
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";   

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const navigate = useNavigate();                 
  const loadStudents = () => {
  
    setLoading(true);
    axiosClient
      .get("/admin/students")
      .then((res) => setStudents(res.data))
      .catch(() => setError("Failed to load students"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    axiosClient
      .delete(`/admin/students/${id}`)
      .then(() => {
        alert("Student deleted.");
        setStudents((prev) => prev.filter((s) => s.id !== id));
      })
      .catch(() => alert("Failed to delete student."));
  };

  const filteredStudents =
    filter === "ALL"
      ? students
      : students.filter((s) => s.role === filter);

  return (
    <div className="card p-4 shadow text-center">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Manage Students</h3>
        
        <select
          className="form-select w-auto"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="STUDENT">Students</option>
          <option value="ADMIN">Admins</option>
        </select>
        
      </div>
<button
          className="btn btn-outline-secondary"
          onClick={() => navigate("/admin")}      // ✅ back button
        >
          Admin Dashboard
        </button> <p></p>
      {error && <div className="alert alert-danger">{error}</div>}

      {loading ? (
        <div>Loading students...</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>PRN</th>
                <th>Role</th>
                <th style={{ minWidth: "120px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((s, idx) => (
                <tr key={s.id}>
                  <td>{idx + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.prnNo}</td>
                  <td>{s.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageStudents;

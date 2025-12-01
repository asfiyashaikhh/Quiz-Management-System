
// import React, { useEffect, useState } from "react";
// import axiosClient from "../../api/axiosClient";
// import { useNavigate } from "react-router-dom";



// const emptyQuestion = () => ({
//   text: "",
//   optionA: "",
//   optionB: "",
//   optionC: "",
//   optionD: "",
//   correctOptionIndex: "",
// });

// const initialQuizForm = {
//   title: "",
//   description: "",
//   durationMinutes: 10,
//   questions: [emptyQuestion()],
// };

// const ManageQuizzes = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [formError, setFormError] = useState("");
//   const [quizForm, setQuizForm] = useState(initialQuizForm);
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//  const navigate = useNavigate();  
//   const loadQuizzes = () => {
//     setLoading(true);
//     axiosClient
//       .get("/admin/quizzes")
//       .then((res) => setQuizzes(res.data))
//       .catch(() => setError("Failed to load quizzes"))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   const openCreateForm = () => {
//     setEditingId(null);
//     setQuizForm(initialQuizForm);
//     setFormError("");
//     setShowForm(true);
//   };

//   const openEditForm = (quiz) => {
//     setEditingId(quiz.id);
//     setFormError("");

//     const mappedQuestions =
//       quiz.questions && quiz.questions.length
//         ? quiz.questions.map((q) => ({
//             text: q.text || "",
//             optionA: q.optionA || "",
//             optionB: q.optionB || "",
//             optionC: q.optionC || "",
//             optionD: q.optionD || "",
//             correctOptionIndex:
//               typeof q.correctOptionIndex === "number"
//                 ? q.correctOptionIndex
//                 : "",
//           }))
//         : [emptyQuestion()];

//     setQuizForm({
//       title: quiz.title || "",
//       description: quiz.description || "",
//       durationMinutes: quiz.durationMinutes || 10,
//       questions: mappedQuestions,
//     });
//     setShowForm(true);
//   };

//   const handleQuizChange = (e) => {
//     const { name, value } = e.target;
//     setQuizForm((prev) => ({
//       ...prev,
//       [name]: name === "durationMinutes" ? Number(value) : value,
//     }));
//   };

//   const handleQuestionChange = (index, field, value) => {
//     setQuizForm((prev) => {
//       const questions = [...prev.questions];
//       questions[index] = { ...questions[index], [field]: value };
//       return { ...prev, questions };
//     });
//   };

//   const addQuestion = () => {
//     setQuizForm((prev) => ({
//       ...prev,
//       questions: [...prev.questions, emptyQuestion()],
//     }));
//   };

//   const removeQuestion = (index) => {
//     setQuizForm((prev) => {
//       if (prev.questions.length === 1) return prev;
//       const questions = prev.questions.filter((_, i) => i !== index);
//       return { ...prev, questions };
//     });
//   };

//   const validateForm = () => {
//     if (!quizForm.title.trim()) {
//       setFormError("Quiz title is required.");
//       return false;
//     }
//     if (!quizForm.durationMinutes || quizForm.durationMinutes <= 0) {
//       setFormError("Duration (minutes) must be greater than 0.");
//       return false;
//     }
//     if (!quizForm.questions.length) {
//       setFormError("At least one question is required.");
//       return false;
//     }
//     for (let i = 0; i < quizForm.questions.length; i++) {
//       const q = quizForm.questions[i];
//       if (!q.text.trim()) {
//         setFormError(`Question ${i + 1}: text is required.`);
//         return false;
//       }
//       if (!q.optionA.trim() || !q.optionB.trim() || !q.optionC.trim() || !q.optionD.trim()) {
//         setFormError(`Question ${i + 1}: all 4 options are required.`);
//         return false;
//       }
//       if (q.correctOptionIndex === "" || q.correctOptionIndex < 0 || q.correctOptionIndex > 3) {
//         setFormError(`Question ${i + 1}: please select correct answer index (0-3).`);
//         return false;
//       }
//     }
//     setFormError("");
//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setSaving(true);

//     const payload = {
//       ...quizForm,
//       questions: quizForm.questions.map((q) => ({
//         ...q,
//         correctOptionIndex: Number(q.correctOptionIndex),
//       })),
//     };

//     const req = editingId
//       ? axiosClient.put(`/admin/quizzes/${editingId}`, payload)
//       : axiosClient.post("/admin/quizzes", payload);

//     req
//       .then(() => {
//         alert(`Quiz ${editingId ? "updated" : "created"} successfully.`);
//         setShowForm(false);
//         setQuizForm(initialQuizForm);
//         setEditingId(null);
//         loadQuizzes();
//       })
//       .catch(() => {
//         setFormError("Failed to save quiz. Please try again.");
//       })
//       .finally(() => setSaving(false));
//   };

//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this quiz?")) return;
//     axiosClient
//       .delete(`/admin/quizzes/${id}`)
//       .then(() => {
//         alert("Quiz deleted.");
//         setQuizzes((prev) => prev.filter((q) => q.id !== id));
//       })
//       .catch(() => alert("Failed to delete quiz."));
//   };

//   return (
//     <div className="card p-4 shadow">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h3>Manage Quizzes</h3>
    
//         <button className="btn btn-success" onClick={openCreateForm}>
//            Add New Quiz
//         </button>
//       </div>
//     <button
//   className="btn btn-outline-secondary"
//   onClick={() => navigate("/admin")}
// >
//     Admin Dashboard
// </button>
//       {error && <div className="alert alert-danger">{error}</div>}

//       {loading ? (
//         <div>Loading quizzes...</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped table-hover">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Duration (min)</th>
//                 <th>Questions</th>
//                 <th>Active</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {quizzes.map((q) => (
//                 <tr key={q.id}>
//                   <td>{q.title}</td>
//                   <td>{q.durationMinutes}</td>
//                   <td>{q.questions ? q.questions.length : 0}</td>
//                   <td>{q.active ? "Yes" : "No"}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-primary me-2"
//                       onClick={() => openEditForm(q)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-sm btn-danger"
//                       onClick={() => handleDelete(q.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {quizzes.length === 0 && (
//                 <tr>
//                   <td colSpan="5" className="text-center">
//                     No quizzes found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {showForm && (
//         <div className="mt-4">
//           <h4>{editingId ? "Edit Quiz" : "Create Quiz"}</h4>
//           {formError && <div className="alert alert-warning">{formError}</div>}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Title</label>
//               <input
//                 className="form-control"
//                 name="title"
//                 value={quizForm.title}
//                 onChange={handleQuizChange}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 name="description"
//                 value={quizForm.description}
//                 onChange={handleQuizChange}
//                 rows={2}
//               ></textarea>
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Duration (minutes)</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="durationMinutes"
//                 min="1"
//                 value={quizForm.durationMinutes}
//                 onChange={handleQuizChange}
//                 required
//               />
//               <small className="text-muted">
//                 This will be used as timer on student side. After time over, quiz auto-submits.
//               </small>
//             </div>

//             <hr />
//             <h5>Questions</h5>

//             {quizForm.questions.map((q, index) => (
//               <div key={index} className="border rounded p-3 mb-3">
//                 <div className="d-flex justify-content-between align-items-center">
//                   <strong>Question {index + 1}</strong>
//                   <button
//                     type="button"
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => removeQuestion(index)}
//                     disabled={quizForm.questions.length === 1}
//                   >
//                     Remove
//                   </button>
//                 </div>

//                 <div className="mt-2 mb-2">
//                   <label className="form-label">Question Text</label>
//                   <textarea
//                     className="form-control"
//                     value={q.text}
//                     onChange={(e) =>
//                       handleQuestionChange(index, "text", e.target.value)
//                     }
//                     rows={2}
//                     required
//                   ></textarea>
//                 </div>

//                 <div className="row">
//                   <div className="col-md-6 mb-2">
//                     <label className="form-label">Option A</label>
//                     <input
//                       className="form-control"
//                       value={q.optionA}
//                       onChange={(e) =>
//                         handleQuestionChange(index, "optionA", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mb-2">
//                     <label className="form-label">Option B</label>
//                     <input
//                       className="form-control"
//                       value={q.optionB}
//                       onChange={(e) =>
//                         handleQuestionChange(index, "optionB", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mb-2">
//                     <label className="form-label">Option C</label>
//                     <input
//                       className="form-control"
//                       value={q.optionC}
//                       onChange={(e) =>
//                         handleQuestionChange(index, "optionC", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mb-2">
//                     <label className="form-label">Option D</label>
//                     <input
//                       className="form-control"
//                       value={q.optionD}
//                       onChange={(e) =>
//                         handleQuestionChange(index, "optionD", e.target.value)
//                       }
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-2">
//                   <label className="form-label">Correct Option Index (0-3)</label>
//                   <select
//                     className="form-select"
//                     value={q.correctOptionIndex}
//                     onChange={(e) =>
//                       handleQuestionChange(
//                         index,
//                         "correctOptionIndex",
//                         e.target.value
//                       )
//                     }
//                     required
//                   >
//                     <option value="">Select</option>
//                     <option value="0">0 - Option A</option>
//                     <option value="1">1 - Option B</option>
//                     <option value="2">2 - Option C</option>
//                     <option value="3">3 - Option D</option>
//                   </select>
//                 </div>
//               </div>
//             ))}

//             <button
//               type="button"
//               className="btn btn-outline-secondary mb-3"
//               onClick={addQuestion}
//             >
//               + Add Question
//             </button>

//             <div className="d-flex justify-content-end gap-2">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => {
//                   setShowForm(false);
//                   setEditingId(null);
//                   setQuizForm(initialQuizForm);
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={saving}
//               >
//                 {saving ? "Saving..." : editingId ? "Update Quiz" : "Create Quiz"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageQuizzes;




// src/pages/admin/ManageQuizzes.jsx
import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

const emptyQuestion = () => ({
  text: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
  correctOptionIndex: "",
});

const initialQuizForm = {
  title: "",
  description: "",
  durationMinutes: 10,
  questions: [emptyQuestion()],
};

const ManageQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [quizForm, setQuizForm] = useState(initialQuizForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const loadQuizzes = () => {
    setLoading(true);
    axiosClient
      .get("/admin/quizzes")
      .then((res) => {
        console.log("ADMIN QUIZZES RESPONSE:", res.data);
        if (Array.isArray(res.data)) {
          setQuizzes(res.data);
        } else {
          setQuizzes([]);
          setError("Unexpected response from server while loading quizzes.");
        }
      })
      .catch((err) => {
        console.error("Error loading quizzes:", err);
        setError("Failed to load quizzes");
        setQuizzes([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setQuizForm(initialQuizForm);
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (quiz) => {
    setEditingId(quiz.id);
    setFormError("");

    const mappedQuestions =
      quiz.questions && quiz.questions.length
        ? quiz.questions.map((q) => ({
            text: q.text || "",
            optionA: q.optionA || "",
            optionB: q.optionB || "",
            optionC: q.optionC || "",
            optionD: q.optionD || "",
            correctOptionIndex:
              typeof q.correctOptionIndex === "number"
                ? q.correctOptionIndex
                : "",
          }))
        : [emptyQuestion()];

    setQuizForm({
      title: quiz.title || "",
      description: quiz.description || "",
      durationMinutes: quiz.durationMinutes || 10,
      questions: mappedQuestions,
    });
    setShowForm(true);
  };

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuizForm((prev) => ({
      ...prev,
      [name]: name === "durationMinutes" ? Number(value) : value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuizForm((prev) => {
      const questions = [...prev.questions];
      questions[index] = { ...questions[index], [field]: value };
      return { ...prev, questions };
    });
  };

  const addQuestion = () => {
    setQuizForm((prev) => ({
      ...prev,
      questions: [...prev.questions, emptyQuestion()],
    }));
  };

  const removeQuestion = (index) => {
    setQuizForm((prev) => {
      if (prev.questions.length === 1) return prev;
      const questions = prev.questions.filter((_, i) => i !== index);
      return { ...prev, questions };
    });
  };

  const validateForm = () => {
    if (!quizForm.title.trim()) {
      setFormError("Quiz title is required.");
      return false;
    }
    if (!quizForm.durationMinutes || quizForm.durationMinutes <= 0) {
      setFormError("Duration (minutes) must be greater than 0.");
      return false;
    }
    if (!quizForm.questions.length) {
      setFormError("At least one question is required.");
      return false;
    }
    for (let i = 0; i < quizForm.questions.length; i++) {
      const q = quizForm.questions[i];
      if (!q.text.trim()) {
        setFormError(`Question ${i + 1}: text is required.`);
        return false;
      }
      if (
        !q.optionA.trim() ||
        !q.optionB.trim() ||
        !q.optionC.trim() ||
        !q.optionD.trim()
      ) {
        setFormError(`Question ${i + 1}: all 4 options are required.`);
        return false;
      }
      if (
        q.correctOptionIndex === "" ||
        q.correctOptionIndex < 0 ||
        q.correctOptionIndex > 3
      ) {
        setFormError(
          `Question ${i + 1}: please select correct answer index (0–3).`
        );
        return false;
      }
    }
    setFormError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);

    const payload = {
      ...quizForm,
      questions: quizForm.questions.map((q) => ({
        ...q,
        correctOptionIndex: Number(q.correctOptionIndex),
      })),
    };

    const req = editingId
      ? axiosClient.put(`/admin/quizzes/${editingId}`, payload)
      : axiosClient.post("/admin/quizzes", payload);

    req
      .then(() => {
        alert(`Quiz ${editingId ? "updated" : "created"} successfully.`);
        setShowForm(false);
        setQuizForm(initialQuizForm);
        setEditingId(null);
        loadQuizzes();
      })
      .catch(() => {
        setFormError("Failed to save quiz. Please try again.");
      })
      .finally(() => setSaving(false));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    axiosClient
      .delete(`/admin/quizzes/${id}`)
      .then(() => {
        alert("Quiz deleted.");
        setQuizzes((prev) =>
          Array.isArray(prev) ? prev.filter((q) => q.id !== id) : []
        );
      })
      .catch(() => alert("Failed to delete quiz."));
  };

  return (
    <div className="card p-4 shadow text-center">
      {/* Header row */}
      <div className="d-flex justify-content-between align-items-center mb-3 ">
        <h3>Manage Quizzes</h3>
        <div className="d-flex gap-2">
          
          <button className="btn btn-success" onClick={openCreateForm}>
            Add New Quiz
          </button>
        </div>
      </div>
<button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/admin")}
          >
           Admin Dashboard
          </button><p></p>
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Table */}
      {loading ? (
        <div>Loading quizzes...</div>
      ) : (
        <div className="table-responsive mb-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration (min)</th>
                <th>Questions</th>
                <th>Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(quizzes) && quizzes.length > 0 ? (
                quizzes.map((q) => (
                  <tr key={q.id}>
                    <td>{q.title}</td>
                    <td>{q.durationMinutes}</td>
                    <td>{q.questions ? q.questions.length : 0}</td>
                    <td>{q.active ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => openEditForm(q)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(q.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No quizzes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Form section */}
      {showForm && (
        <div className="mt-4">
          <h4>{editingId ? "Edit Quiz" : "Create Quiz"}</h4>
          {formError && <div className="alert alert-warning">{formError}</div>}

          <form onSubmit={handleSubmit}>
            {/* Quiz title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={quizForm.title}
                onChange={handleQuizChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                rows={2}
                value={quizForm.description}
                onChange={handleQuizChange}
              />
            </div>

            {/* Duration */}
            <div className="mb-3">
              <label className="form-label">Duration (minutes)</label>
              <input
                type="number"
                min="1"
                className="form-control"
                name="durationMinutes"
                value={quizForm.durationMinutes}
                onChange={handleQuizChange}
                required
              />
              <small className="text-muted">
                This duration will be used as quiz timer on student side.
              </small>
            </div>

            <hr />
            <h5>Questions</h5>

            {quizForm.questions.map((q, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <strong>Question {index + 1}</strong>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeQuestion(index)}
                    disabled={quizForm.questions.length === 1}
                  >
                    Remove
                  </button>
                </div>

                <div className="mt-2 mb-2">
                  <label className="form-label">Question Text</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={q.text}
                    onChange={(e) =>
                      handleQuestionChange(index, "text", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Option A</label>
                    <input
                      className="form-control"
                      value={q.optionA}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionA", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Option B</label>
                    <input
                      className="form-control"
                      value={q.optionB}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionB", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Option C</label>
                    <input
                      className="form-control"
                      value={q.optionC}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionC", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="form-label">Option D</label>
                    <input
                      className="form-control"
                      value={q.optionD}
                      onChange={(e) =>
                        handleQuestionChange(index, "optionD", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="mb-2">
                  <label className="form-label">
                    Correct Option Index (0–3)
                  </label>
                  <select
                    className="form-select"
                    value={q.correctOptionIndex}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctOptionIndex",
                        e.target.value
                      )
                    }
                    required
                  >
                    <option value="">Select</option>
                    <option value="0">0 - Option A</option>
                    <option value="1">1 - Option B</option>
                    <option value="2">2 - Option C</option>
                    <option value="3">3 - Option D</option>
                  </select>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-secondary mb-3"
              onClick={addQuestion}
            >
              Add Question
            </button>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setQuizForm(initialQuizForm);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={saving}>
                {saving
                  ? "Saving..."
                  : editingId
                  ? "Update Quiz"
                  : "Create Quiz"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageQuizzes;

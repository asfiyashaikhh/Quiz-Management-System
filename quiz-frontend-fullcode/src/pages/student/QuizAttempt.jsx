
// import React, { useEffect, useState, useCallback } from "react";
// import {useParams, useNavigate} from "react-router-dom";
// import axiosClient from "../../api/axiosClient";
// import QuizTimer from "../../components/QuizTimer";
// import { useAuth } from "../../context/AuthContext";

// const QuizAttempt = () => {
//   const { quizId } = useParams();
//   const { user } = useAuth();
//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();  
//   useEffect(() => {
//     axiosClient
//       .get(`/student/quizzes/${quizId}`)
//       .then((res) => setQuiz(res.data))
//       .catch(() => navigate("/student/quizzes"));
//   }, [quizId, navigate]);

//   const handleChange = (questionId, optionIndex) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
//   };

//   const submitQuiz = useCallback(() => {
//     if (submitting || !user) return;
//     setSubmitting(true);
//     const payload = {
//       quizId: Number(quizId),
//       userId: user.id,
//       answers: Object.entries(answers).map(([questionId, optionIndex]) => ({
//         questionId: Number(questionId),
//         selectedOption: optionIndex,
//       })),
//     };
//     axiosClient
//       .post("/student/quizzes/submit", payload)
//       .then((res) => {
//         alert(`Quiz submitted! Your score: ${res.data.score}`);
//         navigate("/student/results");
//       })
//       .catch((err) => {
//         alert(err.response?.data || "Error submitting quiz.");
//         setSubmitting(false);
//       });
//   }, [answers, quizId, user, submitting, navigate]);

//   const handleTimeUp = () => {
//     alert("Time is over. Submitting quiz automatically.");
//     submitQuiz();
//   };

//   if (!quiz) return <div>Loading quiz...</div>;

//   return (
//     <div className="card p-4 shadow">
//       <button
//           className="btn btn-outline-secondary"
//           onClick={() => navigate("/student")}          // ✅ back
//         >
//           Student Dashboard
//         </button>
//       <div className="d-flex justify-content-between align-items-center">
//         <h3>{quiz.title}</h3>
//         <span className="badge bg-secondary">
//           Duration: {quiz.durationMinutes} min
//         </span>
//       </div>

//       <QuizTimer
//         durationMinutes={quiz.durationMinutes}
//         onTimeUp={handleTimeUp}
//       />

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           submitQuiz();
//         }}
//       >
//         {quiz.questions.map((q, index) => (
//           <div key={q.id} className="mb-4">
//             <strong>
//               Q{index + 1}. {q.text}
//             </strong>
//             <div className="mt-2">
//               {q.options.map((opt, idx) => (
//                 <div className="form-check" key={idx}>
//                   <input
//                     className="form-check-input"
//                     type="radio"
//                     name={`q-${q.id}`}
//                     checked={answers[q.id] === idx}
//                     onChange={() => handleChange(q.id, idx)}
//                   />
//                   <label className="form-check-label">{opt}</label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}

//     <button
//   type="submit"
//   className="btn btn-success"
//   disabled={submitting}
// >
//   Submit Quiz
// </button>
//       </form>
//     </div>
//   );
// };

// export default QuizAttempt;



import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";
import QuizTimer from "../../components/QuizTimer";
import { useAuth } from "../../context/AuthContext";

const QuizAttempt = () => {
  const { quizId } = useParams();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false); // mutable guard to prevent double submissions
  const navigate = useNavigate();

  // 🔒 Block browser back button while on quiz page
  useEffect(() => {
    // Push current state so that back goes to same page
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Push state again to cancel back
      window.history.pushState(null, "", window.location.href);
      alert("You cannot go back during the quiz.");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    // load quiz
    axiosClient
      .get(`/student/quizzes/${quizId}`)
      .then((res) => setQuiz(res.data))
      .catch((err) => alert(err.response?.data || "Failed to load quiz."));
  }, [quizId]);

  // stable submit function
  const submitQuiz = useCallback(() => {
    // guard with ref: immediate, synchronous check
    if (submittingRef.current || !user) return;

    // set lock immediately
    submittingRef.current = true;
    setSubmitting(true);

    const payload = {
      quizId: Number(quizId),
      userId: user.id,
      answers: Object.entries(answers).map(([questionId, optionIndex]) => ({
        questionId: Number(questionId),
        selectedOption: optionIndex,
      })),
    };

    axiosClient
      .post("/student/quizzes/submit", payload)
      .then((res) => {
        submittingRef.current = false;
        setSubmitting(false);
        alert(`Quiz submitted! Your score: ${res.data.score}`);

        // Optional: after quiz, allow normal back again
        window.onpopstate = null;

        navigate("/student/results");
      })
      .catch((err) => {
        submittingRef.current = false;
        setSubmitting(false);
        alert(err.response?.data || "Error submitting quiz.");
      });
  }, [answers, quizId, user, navigate]);

  // stable handler passed to QuizTimer
  const handleTimeUp = useCallback(() => {
    alert("Time is over. Submitting quiz automatically.");
    submitQuiz();
  }, [submitQuiz]);

  const handleOptionChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div>
      <h3>{quiz.title}</h3>
      <div className="mb-2">
        <span className="badge bg-secondary">
          Duration: {quiz.durationMinutes} min
        </span>
      </div>

      <QuizTimer
        durationMinutes={quiz.durationMinutes}
        onTimeUp={handleTimeUp}
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitQuiz();
        }}
      >
        {quiz.questions.map((q, index) => (
          <div key={q.id} className="mb-4">
            <strong>
              Q{index + 1}. {q.text}
            </strong>
            <div className="mt-2">
              {q.options.map((opt, idx) => (
                <div className="form-check" key={idx}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q-${q.id}`}
                    checked={answers[q.id] === idx}
                    onChange={() => handleOptionChange(q.id, idx)}
                  />
                  <label className="form-check-label">{opt}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="btn btn-success"
          disabled={submitting}
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizAttempt;

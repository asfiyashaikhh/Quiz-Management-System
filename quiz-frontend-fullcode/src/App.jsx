
// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Footer from "./components/Footer";

// import Dashboard from "./pages/Dashboard";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Contact from "./pages/Contact";

// import StudentDashboard from "./pages/student/StudentDashboard";
// import StudentQuizzes from "./pages/student/StudentQuizzes";
// import StudentResults from "./pages/student/StudentResults";
// import StudentRanking from "./pages/student/StudentRanking";
// import QuizAttempt from "./pages/student/QuizAttempt";

// import AdminDashboard from "./pages/admin/AdminDashboard";
// import ManageQuizzes from "./pages/admin/ManageQuizzes";
// import ManageStudents from "./pages/admin/ManageStudents";
// import ViewResults from "./pages/admin/ViewResults";

// const App = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="container mt-4 mb-5">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />

//           {/* Student routes */}
//           <Route
//             path="/student"
//             element={
//               <ProtectedRoute allowedRoles={["STUDENT"]}>
//                 <StudentDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/student/quizzes"
//             element={
//               <ProtectedRoute allowedRoles={["STUDENT"]}>
//                 <StudentQuizzes />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/student/results"
//             element={
//               <ProtectedRoute allowedRoles={["STUDENT"]}>
//                 <StudentResults />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/student/ranking"
//             element={
//               <ProtectedRoute allowedRoles={["STUDENT"]}>
//                 <StudentRanking />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/student/quiz/:quizId"
//             element={
//               <ProtectedRoute allowedRoles={["STUDENT"]}>
//                 <QuizAttempt />
//               </ProtectedRoute>
//             }
//           />

//           {/* Admin routes */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN"]}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/quizzes"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN"]}>
//                 <ManageQuizzes />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/students"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN"]}>
//                 <ManageStudents />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/admin/results"
//             element={
//               <ProtectedRoute allowedRoles={["ADMIN"]}>
//                 <ViewResults />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//         <Footer/>
//       </div>
//     </>
//   );
// };

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentQuizzes from "./pages/student/StudentQuizzes";
import StudentResults from "./pages/student/StudentResults";
import StudentRanking from "./pages/student/StudentRanking";
import QuizAttempt from "./pages/student/QuizAttempt";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageQuizzes from "./pages/admin/ManageQuizzes";
import ManageStudents from "./pages/admin/ManageStudents";
import ViewResults from "./pages/admin/ViewResults";

const App = () => {
  return (
    // 🔥 outer layout: full height, column (navbar + content + footer)
    <div className="d-flex flex-column min-vh-100">
      {/* NAVBAR – full width */}
      <Navbar />

      {/* MAIN CONTENT – takes remaining height */}
      <main className="flex-grow-1">
        <div className="container mt-4 mb-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Student routes */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/quizzes"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentQuizzes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/results"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentResults />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/ranking"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentRanking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/quiz/:quizId"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <QuizAttempt />
                </ProtectedRoute>
              }
            />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/quizzes"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageQuizzes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/students"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ManageStudents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/results"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <ViewResults />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </main>

      {/* FOOTER – full width, bottom pe */}
      <Footer />
    </div>
  );
};

export default App;

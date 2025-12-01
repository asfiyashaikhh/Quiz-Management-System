
import React from "react";
import Footer from "../components/Footer";
export default function About() {
  const developers = [
    {
      k: "Swapna Saste",
      v: (
        <a
          href="https://www.linkedin.com/in/swapna-saste-2276a42a7/"
          target="_blank"
          rel="noreferrer noopener"
          className="link-primary text-decoration-none"
        >
          LinkedIn
        </a>
      ),
      b: <p className="mt-2 mb-0 list-unstyled text-secondary">Aspiring SQL & Java Developer</p>,
    },
    {
      k: "Asfiya Shaikh",
      v: (
        <a
          href="https://www.linkedin.com/in/er-asfiya-s-7b06a7213/"
          target="_blank"
          rel="noreferrer noopener"
          className="link-primary text-decoration-none"
        >
          LinkedIn
        </a>
      ),
      b: <p className="mt-2 mb-0 list-unstyled text-secondary">Java, DSA & MySQL</p>,
    },
    ,
    {
      k: "Akash Kokulwar",
      v: (
        <a
          href="https://www.linkedin.com/in/kaushalpatil3391"
          target="_blank"
          rel="noreferrer noopener"
          className="link-primary text-decoration-none"
        >
          LinkedIn
        </a>
      ),
      b: <p className="mt-2 mb-0 list-unstyled text-secondary">Full-Stack Java Developer & AWS</p>,
    }
    
  ];

  return (
    <div>
      <section
       
      >
        

        <div className="container py-5">
          {/* Header */}
          <header className="text-center mb-4">
            <h1 className="h2 fw-bold">Developers Panel</h1>
            <div
              className="mx-auto mt-3"
              style={{
                height: "4px",
                width: "100px",
                borderRadius: "999px",
                background:
                  "linear-gradient(to right, #14b8a6, #3b82f6)",
              }}
            />
          </header>

          {/* Our Stats / Developers */}
          <div className="row g-4 mt-3">
            {developers.map((s, i) => (
              <div className="col-sm-6 col-lg-4" key={i}>
                <div className="card border-0 shadow-sm h-100 text-center">
                  <div className="card-body">
                    <h5 className="card-title fw-semibold">{s.k}</h5>
                    <p className="mb-1">{s.v}</p>
                    <p className="text-muted mb-0">{s.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission & What We Offer - Two Column Section */}
          <div className="row g-4 mt-4">
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="h5 fw-semibold">Our Mission</h3>
                  <ul className="mt-2 mb-0 list-unstyled text-secondary">
                    <li>• To simplify the process of creating, managing, and conducting quizzes for students and administrators.</li>
                    <li>• To automate quiz evaluation, reduce manual workload, and make assessments faster and more efficient.</li>
                    <li>• To offer a transparent, fair, and structured quiz-taking experience for learners.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h3 className="h5 fw-semibold">What We Offer</h3>
                  <ul className="mt-2 mb-0 list-unstyled text-secondary">
                    <li>• A user-friendly platform for creating, updating, and managing quizzes.</li>
                    <li>• Instant, auto-evaluated quiz results with scores and performance analytics.</li>
                    <li>• Clean dashboards for both Admin and Student with easy navigation.</li>
                    <li>• One-time quiz attempt protection to ensure academic integrity.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Challenges Section */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h3 className="h5 fw-semibold">Challenges we faced</h3>
              <ol className="mt-3 mb-0 text-secondary">
                <li> Designing a quiz structure flexible enough for multiple question types while keeping the UI simple.</li>
                <li> Efficiently managing data communication between frontend (React) and backend (Spring Boot + MySQL)..</li>
                <li> Ensuring that students can only attempt each quiz once, with proper validation.</li>
                <li> Ensuring the application remains fast and stable even with large numbers of students and quizzes.</li>
              </ol>
            </div>
          </div>

         
        </div>
      </section>

    </div>
);
}


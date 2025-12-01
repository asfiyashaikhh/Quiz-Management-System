
// import React, { createContext, useContext, useEffect, useState } from "react";

// const ThemeContext = createContext(null);

// export const ThemeProvider = ({ children }) => {
//   const [mode, setMode] = useState(
//     localStorage.getItem("themeMode") || "light"
//   );

//   useEffect(() => {
//     localStorage.setItem("themeMode", mode);
//     if (mode === "dark") {
//       document.body.classList.add("bg-dark", "text-light");
//       document.body.classList.remove("bg-light");
//     } else {
//       document.body.classList.remove("bg-dark", "text-light");
//       document.body.classList.add("bg-light");
//     }
//   }, [mode]);

//   const toggleMode = () => {
//     setMode((prev) => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <ThemeContext.Provider value={{ mode, toggleMode }}>
//       {/* fixed rectangular toggle at bottom-right */}
//       <div
//         style={{
//           position: "fixed",
//           bottom: "10px",
//           right: "10px",
//           zIndex: 9999,
//         }}
//       >
//         <button
//           className="btn btn-outline-secondary px-3"
//           style={{ borderRadius: "0.5rem" }}
//           onClick={toggleMode}
//         >
//           {mode === "light" ? "Dark Mode" : "Light Mode"}
//         </button>
//       </div>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
// src/context/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {/* Wrap entire app with theme class */}
      <div className={mode === "dark" ? "theme-dark" : "theme-light"}>
        {/* fixed rectangular toggle at bottom-right */}
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            zIndex: 9999,
          }}
        >
          <button
            className="btn btn-outline-secondary px-3"
            style={{ borderRadius: "0.5rem" }} // rectangular (not circle)
            onClick={toggleMode}
          >
            {mode === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);


// import React, { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// const storedUser = JSON.parse(localStorage.getItem("quizUser") || "null");

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(storedUser);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("quizUser", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("quizUser");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/main/java/com/example/quiz/service/UserService.java

// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext(null);

const storedUser = JSON.parse(localStorage.getItem("quizUser") || "null");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storedUser);

  // when app loads, if user in localStorage, set axios header
  useEffect(() => {
    if (storedUser?.token) {
      axiosClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedUser.token}`;
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("quizUser", JSON.stringify(userData));
    if (userData.token) {
      axiosClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("quizUser");
    delete axiosClient.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

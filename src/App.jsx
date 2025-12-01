import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";

function App() {
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("currentUserEmail");
    if (savedEmail) {
      setCurrentUserEmail(savedEmail);
    }
  }, []);

  const handleLogin = (email) => {
    setCurrentUserEmail(email);
    localStorage.setItem("currentUserEmail", email);
    navigate("/account");
  };

  const handleLogout = () => {
    setCurrentUserEmail(null);
    localStorage.removeItem("currentUserEmail");
    navigate("/login");
  };

  return (
    <div>
      <Navbar currentUserEmail={currentUserEmail} onLogout={handleLogout} />

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              currentUserEmail ? <Navigate to="/account" /> : <Navigate to="/login" />
            }
          />

          <Route
            path="/login"
            element={
              currentUserEmail ? (
                <Navigate to="/account" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route
            path="/register"
            element={
              currentUserEmail ? (
                <Navigate to="/account" />
              ) : (
                <Register />
              )
            }
          />

          <Route
            path="/account"
            element={
              currentUserEmail ? (
                <Account currentUserEmail={currentUserEmail} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

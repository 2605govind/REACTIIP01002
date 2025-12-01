import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const raw = localStorage.getItem("accounts");
    const accounts = raw ? JSON.parse(raw) : [];

    const already = accounts.find((acc) => acc.email === email);
    if (already) {
      setError("An account with this email already exists.");
      setInfo("");
      return;
    }

    const newAccount = {
      fullName,
      email,
      password,
      bio: "",
    };

    const updated = [...accounts, newAccount];
    localStorage.setItem("accounts", JSON.stringify(updated));

    setError("");
    setInfo("Registration successful. You can now login.");
    setFullName("");
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/login");
    }, 800);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3 className="mb-3">Register</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {info && <div className="alert alert-success">{info}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>

          <p className="mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;

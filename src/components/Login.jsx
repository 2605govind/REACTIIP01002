import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const raw = localStorage.getItem("accounts");
    const accounts = raw ? JSON.parse(raw) : [];

    const user = accounts.find(
      (acc) => acc.email === email && acc.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    setError("");
    onLogin(user.email);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <h3 className="mb-3">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>

          <p className="mt-3 mb-0">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

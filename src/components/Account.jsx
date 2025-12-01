import React, { useEffect, useState } from "react";

function Account({ currentUserEmail }) {
  const [account, setAccount] = useState(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("accounts");
    const accounts = raw ? JSON.parse(raw) : [];
    const user = accounts.find((acc) => acc.email === currentUserEmail);

    if (user) {
      setAccount(user);
      setFullName(user.fullName || "");
      setBio(user.bio || "");
    }
  }, [currentUserEmail]);

  const handleSave = (event) => {
    event.preventDefault();

    const raw = localStorage.getItem("accounts");
    const accounts = raw ? JSON.parse(raw) : [];
    const index = accounts.findIndex((acc) => acc.email === currentUserEmail);

    if (index === -1) {
      setMessage("Account not found.");
      return;
    }

    const updatedUser = {
      ...accounts[index],
      fullName,
      bio,
    };

    accounts[index] = updatedUser;

    localStorage.setItem("accounts", JSON.stringify(accounts));
    setAccount(updatedUser);
    setMessage("Account information updated.");
  };

  if (!account) {
    return <p>Loading account...</p>;
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h3 className="mb-3">My Account</h3>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">Email (read only)</label>
            <input
              type="email"
              className="form-control"
              value={account.email}
              disabled
            />
          </div>

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
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Account;

import { useState } from "react";
import axios from "axios";
import "./Login.css"; // same styling as login

function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/login",
        form
      );

      setMessage(response.data.message);

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("adminName", response.data.admin.name);

      // redirect to admin panel
      window.location.href = "/admin/dashboard";

    } catch (error) {
      setMessage(error.response?.data?.message || "Admin login failed");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">

        <h2>Admin Login</h2>

        {message && (
          <p
            style={{
              color: message.toLowerCase().includes("success") ? "green" : "red",
              textAlign: "center",
              marginBottom: "15px",
              fontWeight: "500"
            }}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Admin Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          Back to User Login? <a href="/login">Click Here</a>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;

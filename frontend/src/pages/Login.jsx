import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {
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
        "http://localhost:5000/api/users/login",
        form
      );

      setMessage(response.data.message);
      console.log("LOGIN SUCCESS:", response.data);

      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userId", response.data.user.id);


      // Redirect after login
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>

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
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <div className="signup-link">
          New here? <a href="/signup">Create Account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
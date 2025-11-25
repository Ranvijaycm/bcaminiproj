import { useState } from "react";
import "./Login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Login Data:", form);
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>

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

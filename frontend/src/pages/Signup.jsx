import { useState } from "react";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: ""
  });

  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        form
      );

      setMessage(response.data.message);
      console.log("SIGNUP SUCCESS:", response.data);

      // Redirect after signup
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Your Account</h2>

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
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={handleChange}
          />

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

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
          />

          <button type="submit">Sign Up</button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Signup;

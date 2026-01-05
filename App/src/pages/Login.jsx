import { useState } from "react"; 
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Błąd logowania");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Błąd połączenia z serwerem");
    }
  };

  return (
    <div className="login-page">

      <header>
        <h1 id="title">Keep your company data online</h1>
        <p id="description">💾The solution to protect your data💾</p>
      </header>
      {error && <p className="error">{error}</p>}
      <form id="login-form" autoComplete="off" onSubmit={handleSubmit}>
        <legend>Log in to your account</legend>

        {/* Fake inputs to block Chrome autofill */}
        <input type="text" name="fake-email" style={{ display: "none" }} />
        <input type="password" name="fake-pass" style={{ display: "none" }} />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="new-email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
   
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required

        />

        <button id="submit" type="submit">
          Login
        </button>
      </form>

      <div id="message"></div>

    </div>
  );
}

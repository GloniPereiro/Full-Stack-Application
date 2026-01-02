export default function Login() {
  return (
    <div className="login-page">

      <header>
        <h1 id="title">Keep your company data online</h1>
        <p id="description">💾The solution to protect your data💾</p>
      </header>

      <form id="login-form" autoComplete="off">
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
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter your password"
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

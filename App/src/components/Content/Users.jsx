/*import { useState } from "react";

export default function Users() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/admin/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || "Błąd");
        return;
      }

      setError("");
      alert("Użytkownik utworzony");

      // reset formularza
      setEmail("");
      setPassword("");
      setRole("user");

    } catch (err) {
      console.error("Błąd tworzenia użytkownika:", err);
      setError("Wystąpił błąd podczas tworzenia użytkownika");
    }
  };

  return (
    <div>
      <h2>Panel administratora</h2>
      <h3>Utwórz nowego użytkownika</h3>

      <form id="admin-create-user" autoComplete="off" onSubmit={handleCreateUser}>
       // { fake pola do wyłączenia autofill }
        <input type="email" name="fake-email" style={{ display: "none" }} />
        <input type="password" name="fake-pass" style={{ display: "none" }} />

        <input
          type="email"
          id="new-email"
          autoComplete="new-email"
          placeholder="Email użytkownika"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="new-password"
          autoComplete="new-password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          id="new-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Utwórz użytkownika</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
*/

import { useState, useEffect } from "react";

export default function Users() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  // -----------------------------
  // 1. Pobieranie listy użytkowników
  // -----------------------------
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await res.json();

      if (data.ok) {
        setUsers(data.users);
      } else {
        setError(data.message || "Błąd pobierania użytkowników");
      }
    } catch (err) {
      console.error(err);
      setError("Błąd połączenia z serwerem");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchUsers();
  }, []);

  // -----------------------------
  // 2. Walidacja emaila
  // -----------------------------
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // -----------------------------
  // 3. Tworzenie użytkownika
  // -----------------------------
  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Niepoprawny adres email");
      return;
    }

    if (password.length < 6) {
      setError("Hasło musi mieć co najmniej 6 znaków");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/admin/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || "Błąd");
        setLoading(false);
        return;
      }

      alert("Użytkownik utworzony");

      // reset formularza
      setEmail("");
      setPassword("");
      setRole("user");

      // odśwież listę
      fetchUsers();

    } catch (err) {
      console.error(err);
      setError("Błąd połączenia z serwerem");
    }

    setLoading(false);
  };

  // -----------------------------
  // 4. Usuwanie użytkownika
  // -----------------------------
  const deleteUser = async (id) => {
    if (!window.confirm("Na pewno usunąć użytkownika?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await res.json();

      if (data.ok) {
        setUsers(prev => prev.filter(u => u._id !== id));
      } else {
        alert(data.message || "Błąd");
      }
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z serwerem");
    }
  };

  // -----------------------------
  // 5. Zmiana roli użytkownika
  // -----------------------------
  const changeRole = async (id, newRole) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`http://localhost:5000/api/admin/users/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await res.json();

      if (data.ok) {
        setUsers(prev =>
          prev.map(u => (u._id === id ? { ...u, role: newRole } : u))
        );
      } else {
        alert(data.message || "Błąd");
      }
    } catch (err) {
      console.error(err);
      alert("Błąd połączenia z serwerem");
    }
  };

  // -----------------------------
  // RENDER
  // -----------------------------
  return (
    <div>
      <h2>Panel administratora</h2>
      <h3>Utwórz nowego użytkownika</h3>

      <form id="admin-create-user" autoComplete="off" onSubmit={handleCreateUser}>
        {/* fake pola do wyłączenia autofill */}
        <input type="email" name="fake-email" style={{ display: "none" }} />
        <input type="password" name="fake-pass" style={{ display: "none" }} />

        <input
          type="email"
          id="new-email"
          autoComplete="new-email"
          placeholder="Email użytkownika"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="new-password"
          autoComplete="new-password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          id="new-role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Tworzenie..." : "Utwórz użytkownika"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <hr />

      <h3>Lista użytkowników</h3>

      <ul>
        {users.map((u) => (
          <li key={u._id} style={{ marginBottom: "10px" }}>
            <strong>{u.email}</strong> — rola:{" "}
            <select
              value={u.role}
              onChange={(e) => changeRole(u._id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => deleteUser(u._id)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

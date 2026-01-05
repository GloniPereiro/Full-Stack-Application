import { useState } from "react";

export default function Logi() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/admin/logs", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      const data = await response.json();

      if (!data.ok) {
        setError(data.message || "Błąd");
        return;
      }

      setError("");
      setLogs(data.logs);

    } catch (err) {
      console.error("Błąd pobierania logów:", err);
      setError("Wystąpił błąd podczas pobierania logów");
    }
  };

  function hideLogs() { 
    if (loadLogs.length === 0); // nic nie rób 
    setLogs([]); 
  }


  return (
    <div>
      <h3>Logi systemowe</h3>

      <button onClick={loadLogs}>Załaduj logi</button>
      <button onClick={hideLogs}>Schowaj logi</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            {log.action} — {log.fileName} — {log.date} — {log.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

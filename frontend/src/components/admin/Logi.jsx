
import { useState } from "react";
import { logsService } from "../../services/logsService";

export default function Logi() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const loadLogs = async () => {
    try {
      const data = await logsService.getAll();
      setError("");
      setLogs(data.logs);
    } catch (err) {
      console.error("Błąd pobierania logów:", err);
      setError(err.message || "Wystąpił błąd podczas pobierania logów");
    }
  };

  function hideLogs() {
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

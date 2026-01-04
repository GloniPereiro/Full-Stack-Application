import { useState } from "react";

export default function Uploady({ onUploadSuccess }) {
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        },
        body: formData
      });

      const data = await res.json();

      if (!data.ok) {
        setError(data.message);
        return;
      }

      // wyczyść błąd
      setError("");

      // jeśli chcesz odświeżyć listę plików
      if (onUploadSuccess) onUploadSuccess(data.file);
      alert("Udało sie!");
      // reset inputa
      e.target.reset();

    } catch (err) {
      console.error("Błąd uploadu:", err);
      setError("Wystąpił błąd podczas wysyłania pliku");
    }
  };

  return (
    <div>
      <h3>Prześlij nowy plik</h3>

      <form id="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          name="file"
          id="file-input"
          style={{ display: "none" }}
          required
        />

        <label htmlFor="file-input" id="file-label">
          Wybierz plik
        </label>

        <button type="submit">Wyślij plik</button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

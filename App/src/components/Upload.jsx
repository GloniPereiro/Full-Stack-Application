import { useState } from "react";
import "./Upload.css";
import { Plus } from "lucide-react";
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
      console.log(data.file);
      // reset inputa
      e.target.reset();

    } catch (err) {
      console.error("Błąd uploadu:", err);
      setError("Wystąpił błąd podczas wysyłania pliku");
    }


  };
const [file, setFile] = useState(null);
function handleFileChange(e) {
  setFile(e.target.files[0]);
}
  return (

      <form className="upload-form" onSubmit={handleUpload}>
        <input
          type="file"
          name="file"
          id="file-input"
          style={{ display: "none" }}
          required
          onChange={handleFileChange}
        />
        {file && <div>{file.name}</div>}

        <label htmlFor="file-input" id="file-label" className="label">
          <Plus size={120}className="plus" />
        </label>
        <h3 className="description">Wybierz plik</h3>
        <button type="submit" className="button">Wyślij plik</button>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
  );
}

import { useState } from "react";
import "./Upload.css";
import { Plus, Upload } from "lucide-react";
import { filesService } from "../../services/filesService";

export default function Uploady({ onUploadSuccess }) {
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData(e.target);

    try {
      const data = await filesService.upload(formData);

      // wyczyść błąd
      setError("");

      // jeśli chcesz odświeżyć listę plików
      if (onUploadSuccess) onUploadSuccess(data.file);
      alert("Udało sie!");
      console.log(data.file);
      // reset inputa
      e.target.reset();
      setFile(null);

    } catch (err) {
      console.error("Błąd uploadu:", err);
      setError(err.message || "Wystąpił błąd podczas wysyłania pliku");
    }
  };

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
        <Plus size={120} className="plus" />
      </label>
      <h3 className="description">Wybierz plik</h3>
      <button type="submit" className="button"><Upload /> Wyślij plik</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

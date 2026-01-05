import { useEffect, useState } from "react";
import List from "./List";
import "./Zasoby.css";

export default function Zasoby() {

//1️⃣PObieranie listy plików przy załadowaniu strony
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/files", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        console.log("FILES FROM BACKEND:", data.files);

        setFiles(data.files || []);
      } catch (err) {
        console.error("Błąd pobierania plików:", err);
      }
    };
    fetchFiles();
  }, []);

//2️⃣ Obsługa pobierania
  const handleDownload = (file) => {
  const link = document.createElement("a");
  link.href = file.url; // backend musi zwracać URL
  link.download = file.name;
  link.click();
};

//3️⃣ Obsługa rename
///*
const handleRename = async (file) => {
  const oldFilename = file.name;
  const token = localStorage.getItem("token");
  const newFilenameRaw = prompt("Podaj nową nazwę pliku:", oldFilename);
  const encodedOldName = encodeURIComponent(oldFilename);

  const response = await fetch(`http://localhost:5000/api/files/${encodedOldName}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ newName: newFilenameRaw })
  });

  const data = await response.json();

  if (data.ok) {
    setFiles(prev => prev.map(f => f.name === oldFilename ? data.file : f ) );
    
  } else {
    alert(data.message);
  }
};

//4️⃣ Obsługa delete
const handleDelete = async (file) => {
  if (!confirm(`Usunąć plik ${file.name}?`)) return;

  try {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/files/${file._id}`, {
      method: "DELETE",
      headers: {
      Authorization: `Bearer ${token}`
      }
    });

    setFiles(prev => prev.filter(f => f._id !== file._id));
  } catch (err) {
    console.error("Błąd usuwania pliku:", err);
  }
};

  return (
      
      <List files={files} 
      onDownload={handleDownload}
        onRename={handleRename}
        onDelete={handleDelete} />
  );
}


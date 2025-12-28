const output = document.getElementById('output'); //pobieranie elementu do wyświetlania danych użytkownika
const token = sessionStorage.getItem('token');

if (!token) {
  // Brak tokena – wróć do logowania
  window.location.href = '/login.html';
} else {
  // Przykładowe wywołanie chronionego endpointu
  fetch("http://localhost:5000/api/protected", {
    headers: {
    "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      output.textContent = JSON.stringify(data, null, 2); // Wyświetlanie danych użytkownika
    } else {
      output.textContent = data.message || 'Błąd autoryzacji';
    }
  })
  .catch(() => {
    output.textContent = 'Błąd połączenia';
  });
}

document.getElementById("upload-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const token = sessionStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/files/upload", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token
    },
    body: formData
  });

  const data = await response.json();
  console.log(data);
});


async function loadFiles() {
  const token = sessionStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/files", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  console.log(response); // sprawdź status
  const text = await response.text();
  console.log(text); // zobacz co backend zwraca

  try {
    const data = JSON.parse(text);
    if (data.ok) {
      const list = document.getElementById("file-list");
      list.innerHTML = "";
      data.files.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="http://localhost:5000${file.url}" target="_blank">${file.name}</a> <button data-name="${file.name}" class="download-btn">Pobierz</button>
        <button data-name="${file.name}" class="delete-btn">Usuń</button>
        <button data-name="${file.name}" class="rename-btn">Zmień nazwę</button>`;
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error("Nie można sparsować JSON-a:", err);
  }
}

loadFiles();
//Usuwanie pliku
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const filename = e.target.dataset.name;
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/files/${filename}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const data = await response.json();
    console.log(data);

    if (data.ok) {
      loadFiles(); // odśwież listę
    }
  }
});
// Pobieranie pliku
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("download-btn")) {
    const filename = e.target.dataset.name;
    const token = sessionStorage.getItem("token");

    const response = await fetch(`http://localhost:5000/api/files/download/${filename}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });

    if (!response.ok) {
      console.error("Błąd pobierania pliku");
      return;
    }

    // pobieramy plik jako blob
    const blob = await response.blob();

    // tworzymy URL do pobrania
    const url = window.URL.createObjectURL(blob);

    // tworzymy wirtualny link
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    // klikamy link programowo
    document.body.appendChild(a);
    a.click();

    // sprzątamy
    a.remove();
    window.URL.revokeObjectURL(url);
  }
});

//Zmiana nazwy pliku
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("rename-btn")) {
    const oldFilename = e.target.dataset.name;
    const newFilename = prompt("Podaj nową nazwę pliku:", oldFilename);
    const token = sessionStorage.getItem("token");
    //wyświetlenie błędu jeśli nie podano nazwy
    if (!newFilename) {
      alert("Nazwa pliku nie może być pusta.");
      return;
    }
    //wyświetlenie błędu jeśli nazwa zawiera znaki niedozwolone
    const invalidChars = /[<>:"\/\\|?*\x00-\x1F]/g;
    if (invalidChars.test(newFilename)) {
      alert("Nazwa pliku zawiera niedozwolone znaki.");
      return;
    }
    
    const response = await fetch(`http://localhost:5000/api/files/${oldFilename}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ newName: newFilename })
    });
    const data = await response.json();
    console.log(data);
    if (data.ok) {
      loadFiles(); // odśwież listę
    }
  }
});
// Przykład użycia funkcji renameFile
// renameFile("stara_nazwa.txt", "nowa_nazwa.txt");



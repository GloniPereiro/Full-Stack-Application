
const output = document.getElementById('output'); //pobieranie elementu do wyświetlania danych użytkownika
const token = sessionStorage.getItem('token');
const messageBox = document.getElementById('message');
console.log("messageBox:", messageBox);


function showError(msg) {
    messageBox.textContent = msg;
    messageBox.style.color = 'red';
}

function showSuccess(msg) {
    messageBox.textContent = msg;
    messageBox.style.color = 'green';
}
// Sprawdzenie tokena przy ładowaniu strony
if (!token) {
  // Brak tokena – wróć do logowania
  window.location.href = '/frontend/login.html';
} else {
  // Przykładowe wywołanie chronionego endpointu
  fetch("http://localhost:5000/api/protected", {
    headers: {
    "Authorization": "Bearer " + token
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.message === "jwt expired") {
      sessionStorage.removeItem("token");
      window.location.href = "/frontend/login.html";
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
  if(!data.ok) {
    showError(data.message);
  }
  console.log(data);
});


async function loadFiles() {
  const token = sessionStorage.getItem("token");
  const response = await fetch("http://localhost:5000/api/files", {
    headers: {
      Authorization: "Bearer " + token
    }
  });
  const text = await response.text();
  try {
    const data = JSON.parse(text);
    if (data.ok) {
      const list = document.getElementById("file-list");
      list.innerHTML = "";
      data.files.forEach(file => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="http://localhost:5000${file.url}" target="_blank">${file.name}</a> 
        <button data-name="${file.name}" class="download-btn">Pobierz</button>
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
    else {
      showError(data.message);
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
    const token = sessionStorage.getItem("token");

    const newFilenameRaw = prompt("Podaj nową nazwę pliku:", oldFilename);

    if (!newFilenameRaw || !newFilenameRaw.trim()) {
      alert("Nazwa pliku jest wymagana.");
      return;
    }

    // wyciągamy rozszerzenie z oryginalnej nazwy
const extension = oldFilename.includes(".")
  ? oldFilename.substring(oldFilename.lastIndexOf("."))
  : "";

// sprawdzamy, czy użytkownik podał PRAWDZIWE rozszerzenie
const userHasExtension =
  newFilenameRaw.includes(".") &&
  newFilenameRaw.split(".").pop().trim().length > 0;

// jeśli użytkownik nie podał rozszerzenia → dodajemy je automatycznie
const newFilename = userHasExtension
  ? newFilenameRaw.trim()
  : newFilenameRaw.trim() + extension;


    // niedozwolone znaki
    const invalidChars = /[<>:"\/\\|?*\x00-\x1F]/g;
    if (invalidChars.test(newFilename)) {
      alert("Nazwa pliku zawiera niedozwolone znaki.");
      return;
    }

    const encodedOldName = encodeURIComponent(oldFilename);

    const response = await fetch(`http://localhost:5000/api/files/${encodedOldName}`, {
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
      loadFiles();
    } else {
      showError(data.message);
    }
  }
});

// Obsługa formularza tworzenia użytkownika (tylko dla adminów)
document.getElementById("admin-create-user").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("new-email").value;
  const password = document.getElementById("new-password").value;
  const role = document.getElementById("new-role").value;

  const token = sessionStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/admin/users/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ email, password, role })
  });

  const data = await response.json();

  if (data.ok) {
    alert("Użytkownik utworzony");
  } else {
    alert(data.message || "Błąd");
  }
});
// Ładowanie logów (tylko dla adminów)
document.getElementById("load-logs").addEventListener("click", async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch("http://localhost:5000/api/admin/logs", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const data = await response.json();

  const list = document.getElementById("logs-list");
  list.innerHTML = "";

  if (data.ok) {
    console.log(data);

    data.logs.forEach(Log => {
      const li = document.createElement("li");
      li.textContent = `${Log.action} — ${Log.details || ""} — ${Log.createdAt}`;
      list.appendChild(li);
    });
  } else {
    alert(data.message || "Błąd");
  }
});


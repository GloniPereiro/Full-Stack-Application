# Projekt Inżynierski – Dashboard + Backend API

Pełna aplikacja składająca się z backendu (Node.js + Express + MongoDB) oraz frontendu (React).
Projekt zawiera system logowania, upload plików, panel administratora, zarządzanie użytkownikami oraz logi systemowe.

---

## 🚀 Funkcjonalności

### 🔐 Autoryzacja
- Logowanie użytkownika (JWT)
- Role: `user`, `admin`
- Middleware chroniące endpointy

### 📁 Pliki
- Upload plików
- Pobieranie listy plików
- Zmiana nazwy pliku
- Usuwanie pliku
- Logowanie operacji na plikach

### 👤 Panel administratora
- Tworzenie użytkowników
- Lista użytkowników
- Usuwanie użytkowników
- Zmiana roli użytkownika
- Walidacja emaila i hasła
- Logowanie akcji admina

### 📝 Logi systemowe
- Logi akcji użytkowników i administratorów
- Sortowanie od najnowszych
- Wyświetlanie w panelu React

---

## 📦 Wymagania

- Node.js (>= 18)
- MongoDB (lokalnie lub Atlas)
- npm lub yarn

---

## ⚙️ Instalacja

### 1. Sklonuj repozytorium
git clone [text](https://github.com/GloniPereiro/Samba-Dashboard.git)
cd projekt

### 2. Zainstaluj zależności backendu
cd backend
npm install

### 3. Zainstaluj zależności frontendu
cd ../frontend
npm install


---

## 🔧 Zmienne środowiskowe

W folderze **backend** utwórz plik `.env`:

PORT=5000
MONGO_URI=mongodb://localhost:27017/projekt
JWT_SECRET=twoj_sekret
UPLOAD_DIR=uploads


---

## ▶️ Uruchamianie projektu

### Backend
cd backend
npm start

### Frontend
cd App
npm start


---

## 🧪 Testowanie API

Możesz użyć:
- Postman
- Thunder Client
- Insomnia

Najważniejsze endpointy:

### Auth
- POST `/api/auth/login`

### Pliki
- GET `/api/files`
- POST `/api/files/upload`
- DELETE `/api/files/:id`
- PUT `/api/files/:id/rename`

### Admin
- GET `/api/admin/users`
- POST `/api/admin/users/create`
- DELETE `/api/admin/users/:id`
- PUT `/api/admin/users/:id/role`

### Logi
- GET `/api/admin/logs`

---

## 🛡️ Uprawnienia

| Endpoint | Wymaga logowania | Wymaga roli admin |
|---------|------------------|-------------------|
| Upload pliku | ✔ | ✖ |
| Lista plików | ✔ | ✖ |
| Usuwanie pliku | ✔ | ✔  |
| Panel admina | ✔ | ✔ |
| Logi systemowe | ✔ | ✔ |

---

## 📌 Uwagi

- Wszystkie operacje admina są logowane.
- Wszystkie operacje na plikach są logowane.
- Frontend nie używa manipulacji DOM – czysty React.
- Backend zwraca spójne odpowiedzi JSON (`ok`, `message`, `data`).

---

## 📜 Licencja

Projekt edukacyjny – możesz modyfikować i rozwijać według potrzeb.

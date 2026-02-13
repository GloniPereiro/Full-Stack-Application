# Dokumentacja Architektury Backendu

## Przegląd Techniczny
Aplikacja serwerowa zbudowana w oparciu o środowisko **Node.js** i framework **Express**, korzystająca z bazy danych **MongoDB** (poprzez bibliotekę Mongoose) do trwałego przechowywania danych.

### Główne Technologie
- **Runtime:** Node.js
- **Framework:** Express.js
- **Baza Danych:** MongoDB
- **ORM:** Mongoose
- **Autoryzacja:** JSON Web Token (JWT)
- **Obsługa plików:** Multer

---

## Struktura Katalogów (`backend/src`)

- **`config/`** - Konfiguracja połączenia z bazą danych.
- **`controllers/`** - Logika biznesowa dla poszczególnych endpointów.
- **`middleware/`** - Funkcje pośrednie (autoryzacja, obsługa błędów, walidacja ról).
- **`models/`** - Schematy danych Mongoose.
- **`routes/`** - Definicje ścieżek API i mapowanie na kontrolery.
- **`uploads/`** - Katalog do przechowywania przesłanych plików.

---

## Modele Danych

### 1. User (`users`)
Przechowuje dane autoryzacyjne użytkowników.
- **email** (String, Unique)
- **password** (String)
- **role** (String, domyślnie "user")

### 2. File (`File`)
Metadane przesłanych plików.
- **name** (String) - Oryginalna nazwa pliku.
- **url** (String) - Ścieżka dostępu.
- **size** (Number) - Rozmiar w bajtach.
- **uploadedBy** (String) - Email użytkownika przesyłającego.
- **uploadedAt** (Date) - Data przesłania.

### 3. Log (`Log`)
Rejestr zdarzeń w systemie (audyt).
- **userId** (String)
- **action** (String) - Opis akcji (np. "UPLOAD", "DELETE").
- **fileName** (String) - Nazwa pliku, którego dotyczyła akcja (opcjonalne).
- **date** (Date) - Czas zdarzenia.
- **email** (String) - Email sprawcy zdarzenia.

---

## API Endpoints
Bazowy URL: `http://localhost:5000/api`

### Autoryzacja (`/api/login`)
| Metoda | Endpoint | Wymagane Body | Opis |
|--------|----------|---------------|------|
| POST | `/login` | `{ email, password }` | Logowanie użytkownika i zwrot tokenu JWT. |

### Pliki (`/api/files`)
Wymagają nagłówka `Authorization: Bearer <token>`.

| Metoda | Endpoint | Wymagane Body | Role | Opis |
|--------|----------|---------------|------|------|
| GET | `/` | - | User/Admin | Pobranie listy plików. |
| POST | `/upload` | `FormData` (file) | User/Admin | Przesłanie nowego pliku. |
| DELETE | `/:filename` | - | **Admin** | Usunięcie pliku (trwałe). |
| GET | `/download/:filename` | - | User/Admin | Pobranie pliku. |
| PUT | `/:filename` | `{ newName }` | User/Admin | Zmiana nazwy pliku. |

### Logi (`/api/logs`)
Wymagają nagłówka `Authorization: Bearer <token>`.

| Metoda | Endpoint | Wymagane Body | Role | Opis |
|--------|----------|---------------|------|------|
| GET | `/` | - | **Admin** | Pobranie historii operacji systemowych. |

---

## Znane Ograniczenia
1. **Zarządzanie Użytkownikami**: Obecna wersja backendu nie udostępnia publicznego API do tworzenia, edycji ani usuwania użytkowników (brak endpointów `/api/users`). Zarządzanie musi odbywać się bezpośrednio w bazie danych.

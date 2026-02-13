# Dokumentacja Frontendu dla Pracy Inżynierskiej

## 1. Wybór Technologii i Struktura Projektu

### Technologie główne
- **React.js (v19)**: Biblioteka do budowy interfejsów użytkownika. Zastosowana ze względu na komponentowe podejście i ogromne wsparcie społeczności.
- **Vite (v6)**: Narzędzie do budowania i serwowania aplikacji. Zapewnia błyskawiczny Hot Module Replacement (HMR) i optymalizację kodu produkcyjnego.
- **React Router Dom (v7)**: Obsługa routingu po stronie klienta (SPA - Single Page Application).
- **Vitest**: Nowoczesny framework testowy, kompatybilny z Vite, służący do testów jednostkowych i integracyjnych.
- **Lucide React**: Biblioteka ikon wektorowych.

### Struktura katalogów (`/frontend/src`)
- **`components/`**: Komponenty prezentacyjne, podzielone na moduły:
    - **`layout/`**: Układ strony (Sidebar, Header).
    - **`admin/`**: Panel administracyjny (Logi, Użytkownicy).
    - **`monitoring/`**: Wykresy i status systemu.
    - **`files/`**: Upload i zarządzanie plikami.
- **`pages/`**: Główne widoki aplikacji (Login, Dashboard).
- **`services/`**: Warstwa komunikacji z API (wzorzec Service Layer).
- **`test/`**: Konfiguracja testów.

## 2. Architektura i Wzorce Projektowe

### Warstwa Serwisowa (Service Layer)
W celu zachowania czystości kodu i separacji odpowiedzialności, cała komunikacja z backendem została wydzielona do modułów w katalogu `services`.
- **`apiService.js`**: Fasada dla API `fetch`. Automatycznie dodaje nagłówki autoryzacyjne (JWT) i obsługuje błędy HTTP.
- **`authService.js`**, **`usersService.js`**, **`logsService.js`**, **`filesService.js`**: Moduły dziedzinowe wykorzystujące `apiService` do realizacji konkretnych operacji biznesowych.

### Komponenty Stanowe (Stateful Components)
Komponenty takie jak `Logi.jsx` czy `Users.jsx` zarządzają swoim lokalnym stanem (dane, ładowanie, błędy) i wywołują metody serwisowe wewnątrz hooka `useEffect`.

## 3. Instrukcja dla Pracy Inżynierskiej

Aby opisać powyższy frontend w rozdziale implementacyjnym, możesz posłużyć się poniższymi schematami:

### Podrozdział: Technologie i Narzędzia
> "W warstwie prezentacji wykorzystano bibliotekę React.js w wersji 19. Wybór ten podyktowany był koniecznością stworzenia dynamicznego interfejsu użytkownika typu SPA (Single Page Application). Jako środowisko uruchomieniowe i budujące wybrano Vite, co pozwoliło na znaczące przyspieszenie procesu dewelopmentu..."

### Podrozdział: Architektura Systemu - Warstwa Prezentacji
> "Architektura frontendu opiera się na podziale na komponenty wizualne oraz warstwę serwisową. Zastosowano wzorzec Service Layer, aby uniezależnić komponenty React od szczegółów implementacyjnych komunikacji HTTP..."

**Warto dodać snippet kodu** z `src/services/apiService.js` jako przykład implementacji centralnej obsługi zapytań API i dołączania tokenu JWT.

### Podrozdział: Mechanizmy Bezpieczeństwa
> "Aplikacja realizuje mechanizm uwierzytelniania oparty na tokenach JWT. Token przechowywany jest w LocalStorage przeglądarki i automatycznie dołączany do każdego zapytania w nagłówku `Authorization`..."

## 4. Testowanie
W projekcie skonfigurowano środowisko testowe oparte na **Vitest** i **React Testing Library**.
- **Testy jednostkowe (`apiService.test.js`)**: Weryfikują logikę dołączania nagłówków i obsługi błędów w warstwie API.
- **Testy komponentów (`Login.test.jsx`)**: Sprawdzają poprawność renderowania formularzy i interakcję z użytkownikiem (np. wysłanie formularza logowania).

Uruchomienie testów: `npm test`

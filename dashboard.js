const output = document.getElementById('output');
    const token = sessionStorage.getItem('token');

    if (!token) {
      // Brak tokena – wróć do logowania
      window.location.href = '/login.html';
    } else {
      // Przykładowe wywołanie chronionego endpointu
      fetch('http://localhost:5000/protected', { //adres endpointu do testowania chronionego zasobu
        headers: {
          'Authorization': `Bearer ${token}`
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

const form = document.getElementById('login-form'); //pobieranie formularza logowania
const messageBox = document.getElementById('message');//pobieranie elementu do wyświetlania komunikatów
//funkcja do wyświetlania komunikatów

form.addEventListener('submit', async (e) => {
    e.preventDefault(); //zapobiega domyślnej akcji formularza

    const email = form.elements['email'].value.trim(); //pobieranie wartości pola email
    const password = form.elements['password'].value.trim(); // pobieranie wartości pola hasła

    try { 
        //wysyłanie danych do serwera
        const response = await fetch('http://localhost:5000/login', { //adres endpointu API
            method: 'POST', //metoda POST do wysyłania danych
            headers: { 'Content-Type': 'application/json' }, //ustawienie nagłówka Content-Type
            body: JSON.stringify({ email, password }) //konwersja danych do formatu JSON
        });

        const data = await response.json(); //parsowanie odpowiedzi JSON

        if (response.ok && data.ok) { //sprawdzenie czy odpowiedź jest poprawna
            messageBox.textContent = data.message; //wyświetlanie komunikatu sukcesu
            messageBox.style.color = 'green'; //wyświetlanie komunikatu sukcesu
            sessionStorage.setItem('token', data.token); //przechowywanie tokena w sessionStorage
            window.location.href = '/dashboard.html'; //przekierowanie do strony dashboard
        } else {
            messageBox.textContent = data.message || 'Błąd logowania.'; //wyświetlanie komunikatu błędu
            messageBox.style.color = 'red'; //wyświetlanie komunikatu błędu
        }
    } catch (error) {
        messageBox.textContent = 'Wystąpił błąd sieci.'; //wyświetlanie komunikatu błędu sieci
        messageBox.style.color = 'red'; //wyświetlanie komunikatu błędu sieci
    }
});

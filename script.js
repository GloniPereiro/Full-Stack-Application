
const loginForm = document.getElementById('login-form'); //pobieranie formularza logowania
const registerForm = document.getElementById('register-form'); //pobieranie formularza rejestracji
 const messageBox = document.getElementById('message');//pobieranie elementu do wyświetlania komunikatów
//funkcja do wyświetlania komunikatów

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //zapobiega domyślnej akcji formularza

    const regEmail = registerForm.elements['reg-email'].value.trim(); //pobieranie wartości pola email
    const regPassword = registerForm.elements['reg-password'].value.trim(); // pobieranie wartości pola hasła
    console.log({ regEmail, regPassword });
    try { 
        //wysyłanie danych do serwera
        const response = await fetch('http://localhost:5000/api/auth/register', { //adres endpointu API
            method: 'POST', //metoda POST do wysyłania danych
            headers: { 'Content-Type': 'application/json' }, //ustawienie nagłówka Content-Type
            body: JSON.stringify({ email: regEmail, password: regPassword }) //konwersja danych do formatu JSON
        });

        const data = await response.json(); //parsowanie odpowiedzi JSON
        console.log("Response status:", response.status); console.log("Response data:", data);

        if (response.ok) { //sprawdzenie czy odpowiedź jest poprawna
            messageBox.textContent = data.message; //wyświetlanie komunikatu sukcesu
            messageBox.style.color = 'green'; //wyświetlanie komunikatu sukcesu
        } else {
            messageBox.textContent = data.message || 'Błąd rejestracji.'; //wyświetlanie komunikatu błędu 
            messageBox.style.color = 'red'; //wyświetlanie komunikatu błędu
        }
    } catch (error) {
        messageBox.textContent = 'Wystąpił błąd sieci.'; //wyświetlanie komunikatu błędu sieci
        messageBox.style.color = 'red'; //wyświetlanie komunikatu błędu sieci
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); //zapobiega domyślnej akcji formularza

    const email = loginForm.elements['email'].value.trim(); //pobieranie wartości pola email
    const password = loginForm.elements['password'].value.trim(); // pobieranie wartości pola hasła
    console.log({ email, password });
    try { 
        //wysyłanie danych do serwera
        const response = await fetch('http://localhost:5000/api/auth/login', { //adres endpointu API
            method: 'POST', //metoda POST do wysyłania danych
            headers: { 'Content-Type': 'application/json' }, //ustawienie nagłówka Content-Type
            body: JSON.stringify({ email, password }) //konwersja danych do formatu JSON
        });

        const data = await response.json(); //parsowanie odpowiedzi JSON
        console.log("Response status:", response.status); console.log("Response data:", data);

        if (response.ok) { //sprawdzenie czy odpowiedź jest poprawna
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

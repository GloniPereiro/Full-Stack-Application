const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const messageBox = document.getElementById('message');

function showError(msg) {
    messageBox.textContent = msg;
    messageBox.style.color = 'red';
}

function showSuccess(msg) {
    messageBox.textContent = msg;
    messageBox.style.color = 'green';
}

// REJESTRACJA
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const regEmail = registerForm.elements['reg-email'].value.trim();
    const regPassword = registerForm.elements['reg-password'].value.trim();

    try {
        const response = await fetch('http://localhost:5000/api/userRoutes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: regEmail, password: regPassword })
        });

        const data = await response.json();

        if (response.ok) {
            showSuccess(data.message);
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError("Wystąpił błąd połączenia z serwerem.");
    }
});

// LOGOWANIE
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.elements['email'].value.trim();
    const password = loginForm.elements['password'].value.trim();

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const text = await response.text(); console.log("RAW TEXT:", text); let data; try { data = JSON.parse(text); } catch (e) { showError("Backend zwrócił nie-JSON"); return; }

        if (response.ok) {
            showSuccess(data.message);
            sessionStorage.setItem('token', data.token);
            window.location.href = '/dashboard.html';
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError("Wystąpił błąd sieci.");
    }
});

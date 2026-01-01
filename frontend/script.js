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
            window.location.href = '/frontend/dashboard.html';
        } else {
            showError(data.message);
        }
    } catch (error) {
        showError("Wystąpił błąd sieci.");
    }
});

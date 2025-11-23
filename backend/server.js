const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const TEST_USER = {
  email: "test@test.com",
  password: "password123"
};
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'supersekretnyklucz';
const JWT_EXPIRES_IN = '1h';


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Server działa!' });
});

app.post('/login', (req, res) => { //sprawdzenie danych logowania
  const { email, password } = req.body; //pobieranie danych z body
  if (email === TEST_USER.email && password === TEST_USER.password) { //sprawdzenie danych logowania
    const payload = { email, role: 'user' };  //tworzenie ładunku tokena
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }); //generowanie tokena JWT


    return res.json({ ok: true, message: 'Zalogowano pomyślnie!', token });//poprawne dane logowania i zwrócenie tokena
  }
  return res.status(401).json({ ok: false, message: 'Niepoprawne dane logowania' }); //błędne dane logowania
});

function authMiddleware(req, res, next) { //middleware do weryfikacji tokena
  const authHeader = req.headers.authorization || ''; //pobieranie nagłówka Authorization

  // Oczekujemy formatu: "Bearer <token>"
  const [type, token] = authHeader.split(' '); //podział nagłówka na typ i token
  if (type !== 'Bearer' || !token) { //sprawdzenie formatu nagłówka
    return res.status(401).json({ ok: false, message: 'Brak tokena lub zły format' }); //brak tokena lub zły format
  }

  try { //weryfikacja tokena
    const decoded = jwt.verify(token, JWT_SECRET); //weryfikacja tokena
    // Dołączamy dane użytkownika do requestu
    req.user = decoded; //przechowywanie danych użytkownika w req.user
    next(); //przejście do następnego middleware lub endpointu
  } catch (err) { //błąd weryfikacji tokena
    return res.status(401).json({ ok: false, message: 'Nieprawidłowy lub wygasły token' }); //nieprawidłowy lub wygasły token
  }
}

// endpoint do testowania chronionego zasobu
app.get('/protected', authMiddleware, (req, res) => { //endpoint chroniony przez middleware
  res.json({ ok: true, message: 'Masz dostęp', user: req.user }); //odpowiedź z danymi użytkownika
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

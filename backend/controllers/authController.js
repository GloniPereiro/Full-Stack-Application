const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Do porównywania zaszyfrowanych haseł
const User = require('../models/user'); // Import modelu

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Szukamy użytkownika w bazie po emailu
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ ok: false, message: 'Nie znaleziono użytkownika' });
        }

        // 2. Porównujemy hasło z bazy (zaszyfrowane) z tym z formularza
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ ok: false, message: 'Błędne hasło' });
        }

        // 3. Jeśli wszystko OK, generujemy token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({
            ok: true,
            message: 'Zalogowano pomyślnie!',
            token
        });

    } catch (error) {
        res.status(500).json({ ok: false, message: 'Błąd serwera' });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Sprawdź, czy użytkownik już istnieje
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ ok: false, message: 'Użytkownik już istnieje' });
        }

        // Zaszyfruj hasło (10 to siła szyfrowania)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Zapisz w bazie
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ ok: true, message: 'Użytkownik stworzony!' });
    } catch (error) {
        res.status(500).json({ ok: false, message: 'Błąd podczas rejestracji' });
    }
};

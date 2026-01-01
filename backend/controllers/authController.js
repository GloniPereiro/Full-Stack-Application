const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Do porównywania zaszyfrowanych haseł
const User = require('../models/user'); // Import modelu

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Szukamy użytkownika w bazie po emailu
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Nie znaleziono użytkownika o podanym emailu');
            error.status = 401;
            //return res.status(401).json({ ok: false, message: 'Nie znaleziono użytkownika' });
            return next(error);
        }

        // 2. Porównujemy hasło z bazy (zaszyfrowane) z tym z formularza
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Błędne hasło');
            error.status = 401;
            //return res.status(401).json({ ok: false, message: 'Błędne hasło' });
            return next(error);
        }
        // Sprawdzenie czy login i hasło nie zawierają niebezpiecznych znaków
        // eslint-disable-next-line no-control-regex
        const dangerousChars = /[<>:"'/\\=;|?*\x00-\x1F]/;
        if (dangerousChars.test(email) || dangerousChars.test(password)) {
            const error = new Error('Nieprawidłowe znaki w danych wejściowych');
            error.status = 400;
            return next(error);
        }

        // 3. Jeśli wszystko OK, generujemy token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({
            ok: true,
            message: 'Zalogowano pomyślnie!',
            token
        });

    } catch (err) {
    //res.status(500).json({ ok: false, message: 'Błąd serwera' });
    next(err);
    }
};
/*
exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Sprawdź, czy użytkownik już istnieje
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error('Użytkownik już istnieje');
            error.status = 400;
            //return res.status(400).json({ ok: false, message: 'Użytkownik już istnieje' })
            return next(error);
        }
        // Walidacja prostych znaków w emailu i haśle
        // eslint-disable-next-line no-control-regex
        const dangerousChars = /[<>:"'/\\=;|?*\x00-\x1F]/;
        if (dangerousChars.test(email) || dangerousChars.test(password)) {
            const error = new Error('Nieprawidłowe znaki w danych wejściowych');
            error.status = 400;
            return next(error);
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
    } catch (err) {
        next(err);
        //res.status(500).json({ ok: false, message: 'Błąd podczas rejestracji' });
    }
};
*/

const User = require('../models/users');
const bcrypt = require('bcryptjs');

// 1. Pobierz wszystkich użytkowników (bez hasła)
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}, '-password'); // ukryj hasło
        res.json({ ok: true, users });
    } catch (err) {
        next(err);
    }
};

// 2. Utwórz użytkownika (z walidacją)
exports.createUser = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Walidacja emaila
        if (!email || !email.includes("@")) {
            const err = new Error("Niepoprawny email");
            err.status = 400;
            throw err;
        }

        // Walidacja hasła
        if (!password || password.length < 4) {
            const err = new Error("Hasło musi mieć minimum 4 znaki");
            err.status = 400;
            throw err;
        }

        // Walidacja roli
        const allowedRoles = ["user", "admin"];
        if (role && !allowedRoles.includes(role)) {
            const err = new Error("Niepoprawna rola użytkownika");
            err.status = 400;
            throw err;
        }

        // Sprawdź czy już istnieje
        const existing = await User.findOne({ email });
        if (existing) {
            const err = new Error("Użytkownik z takim emailem już istnieje");
            err.status = 400;
            throw err;
        }

        // Hash hasła
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role: role || 'user'
        });

        res.status(201).json({
            ok: true,
            message: 'Użytkownik utworzony',
            data: { id: newUser._id, email: newUser.email, role: newUser.role }
        });
    } catch (err) {
        next(err);
    }
};

// 3. Usuń użytkownika
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.json({ ok: true, message: 'Użytkownik usunięty' });
    } catch (err) {
        next(err);
    }
};

// 4. Zmień rolę
exports.updateRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!role) {
            const err = new Error('Brak roli');
            err.status = 400;
            throw err;
        }

        await User.findByIdAndUpdate(id, { role });
        res.json({ ok: true, message: 'Rola zmieniona' });
    } catch (err) {
        next(err);
    }
};

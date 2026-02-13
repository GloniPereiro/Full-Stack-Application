const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');

class loginService {
    async login(email, password){
        
    const dangerousChars = /[<>:"'/\\=;|?*\x00-\x1F]/;
    if (dangerousChars.test(email) || dangerousChars.test(password)) {
        throw new Error('Nieprawidłowe znaki w danych wejściowych');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Nie znaleziono użytkownika o podanym emailu');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Błędne hasło');
    }

    const token = jwt.sign({ 
        userId: user._id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET, { expiresIn: '1h' });

    return {
        ok: true,
        message: 'Zalogowano pomyślnie!',
        token
    };
}}

module.exports = new loginService();
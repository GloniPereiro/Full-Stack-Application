const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Log = require('../models/log'); // jeśli masz logi

// GET USERS 
exports.getUsersController = async (req, res, next) => {
    try { 
        const users = await User.find().select("-password"); 
        res.json({ ok: true, users }); 
    } 
    catch (err) { 
        next(err);
    } 
};

// DELETE USER 
exports.deleteUserController = async (req, res,next) => {
    try {
        await User.findByIdAndDelete(req.params.id); 
        await Log.create({
            userId: req.user.id,
            action: "ADMIN_DELETE_USER",
            details: `Usunięto użytkownika: ${User.email}`
        });

        res.json({ ok: true }); 
    } 
    catch (err) { 
        next(err); 
    } 
};

//UpdateRole
exports.updateUserRoleController = async (req, res,next) => { 
    try { 
        const { role } = req.body; 
        const user = await User.findByIdAndUpdate( 
            req.params.id, 
            { role }, 
            { new: true } 
        ).select("-password"); 
        
        await Log.create({
            userId: req.user.id,
            action: "ADMIN_CHANGE_ROLE",
            details: `Zmieniono rolę użytkownika ${user.email} na: ${role}`
        });

        res.json({ ok: true, user }); 
    } 
    catch (err) { 
        next(err); 
    } 
};


//To było
exports.createUserController = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        // Walidacja emaila
        if (!email || !email.includes("@")) {
            const err = new Error("Niepoprawny email");
            err.status = 400;
            return next(err);
        }

        // Walidacja hasła
        if (!password || password.length < 4) {
            const err = new Error("Hasło musi mieć minimum 4 znaki");
            err.status = 400;
            return next(err);
        }

        // Walidacja roli
        const allowedRoles = ["user", "admin"];
        if (role && !allowedRoles.includes(role)) {
            const err = new Error("Niepoprawna rola użytkownika");
            err.status = 400;
            return next(err);
        }

        // Sprawdzenie czy email już istnieje
        const exists = await User.findOne({ email });
        if (exists) {
            const err = new Error("Użytkownik z takim emailem już istnieje");
            err.status = 400;
            return next(err);
        }

        // Hashowanie hasła
        const hashed = await bcrypt.hash(password, 10);

        // Tworzenie użytkownika
        const user = await User.create({
            email,
            password: hashed,
            role: role || "user"
        });

        // Logowanie akcji admina
        await Log.create({
            userId: req.user.id,
            action: "ADMIN_CREATE_USER",
            details: `Utworzono użytkownika: ${email}`
        });

        res.json({
            ok: true,
            message: "Użytkownik utworzony",
            data: { id: user._id, email: user.email, role: user.role }
        });

    } catch (err) {
        next(err);
    }
};

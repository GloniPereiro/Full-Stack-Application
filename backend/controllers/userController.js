const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.createUserController = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashed,
            role: role || "user"
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

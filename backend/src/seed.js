const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/users");

(async () => {
  try {

    await mongoose.connect("mongodb://127.0.0.1:27017/Aplikacja");
    console.log("Połączono z MongoDB");

    const hashedPassword = await bcrypt.hash("admin1", 10);

    const user = await User.create({
      email: "admin@admin.pl",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Użytkownik testowy dodany:");
    console.log(user);

    process.exit();
  } catch (err) {
    console.error("Błąd seedowania:", err);
    process.exit(1);
  }
})();
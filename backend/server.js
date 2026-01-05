require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- ROUTES ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/files', require('./routes/files'));
app.use('/api/protected', require('./routes/protected'));
app.use('/api/admin/logs', require('./routes/admin/logs'));
app.use('/api/uploads', express.static('uploads'));
app.use('/api/admin/users', require('./routes/admin/users'));
app.use('/api/monitoring', require('./routes/monitoring'));
// --- DATABASE ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd połączenia:', err));

// --- ERROR HANDLER (MUSI BYĆ OSTATNI) ---
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// --- SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

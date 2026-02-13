require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use('/api/login', require('./routes/login'));
app.use('/api/files', require('./routes/files'));
app.use('/api/logs', require('./routes/getLogs'));
app.use('/api/users', require('./routes/users'));
app.use('/api/monitoring', require('./routes/monitoring'));
app.use('/api/protected', require('./routes/protected'));

// Static files (uploads)
// Zakładając, że pliki są w folderze backend/uploads (poziom wyżej niż src)
const path = require('path');
app.use('/api/uploads', express.static(path.join(__dirname, '../uploads')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Połączono z MongoDB'))
    .catch(err => console.error('Błąd połączenia:', err));

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
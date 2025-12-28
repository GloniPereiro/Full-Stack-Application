require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);

console.log("SERVER STARTED — TEST LOG");
const express = require("express"); 
const cors = require("cors");//importowanie modułu CORS
const app = express();
app.use(cors()); //zezwalanie na żądania z innych domen
app.use(express.json()); //parsowanie JSON w ciele żądania

const filesRoutes = require('./routes/files'); //importowanie pliku z trasami do obsługi plików
const authRoutes = require('./routes/auth'); //importowanie pliku z trasami do obsługi autoryzacji
app.use('/api/files', filesRoutes); //używanie tras do obsługi plików z prefiksem /api/files
app.use('/api/auth', authRoutes); //używanie tras do obsługi autoryzacji z prefiksem /api/auth

const protectedRoutes = require('./routes/protected');
app.use('/api/protected', protectedRoutes);
app.use('/uploads', express.static('uploads'));//udostępnianie statycznych plików z katalogu uploads

const mongoose = require('mongoose');

// Adres do Twojej bazy danych
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Połączono z MongoDB'))
.catch(err => console.error('Błąd połączenia:', err));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

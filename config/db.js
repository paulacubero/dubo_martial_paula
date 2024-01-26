const mongoose = require('mongoose');
require('dotenv').config();
// URL de conexión a tu base de datos en MongoDB Atlas
const uri = process.env.MONGO_URI;

// Configuración y conexión de Mongoose
mongoose.connect(uri, {});

// Obtener la conexión por defecto
const db = mongoose.connection;

// Manejo de eventos de la conexión
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
	console.log('Conexión exitosa a la base de datos.');
});

module.exports = db;

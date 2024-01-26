// Importa las dependencias necesarias
const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define el puerto en el que se ejecutará el servidor
//const DB = require('./db.json')
const db = require('./config/db');
const User = require('./config/User');
app.use(express.static('public'));
app.use(express.json());
const bodyParser = require('body-parser');
const session = require('express-session');

// Define rutas y controladores
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
	session({
		secret: 'secreto',
		resave: true,
		saveUninitialized: true,
	})
);

app.get('/', (req, res) => {
	res.redirect('index.html');
});

app.get('/usuarioLogeado', (req, res) => {
	res.json(req.session.user);
});

app.get('/cerrar', (req, res) => {
	req.session.destroy();
	res.redirect('/');
});

app.post('/login', async (req, res) => {
	//deconstruir un objeto
	const { username, password } = req.body;
	console.log(username + password);
	try {
		// Crear un nuevo usuario utilizando el modelo User
		const user = await User.findOne({ username });

		if (!user || user.password !== password) {
			res.redirect('errorLogin.html');
		} else {
			req.session.user = {
				id: user._id,
				username: user.username,
			};

			res.redirect('horarios.html');
		}
	} catch (error) {
		console.error('Error al crear el usuario:', error);
		res.status(500).json({ message: 'Error interno del servidor' });
	}
});

app.get('/errorLogin', (req, res) => {
	res.redirect('errorLogin.html');
});

app.get('/horariosSocios', (req, res) => {
	res.redirect('horariosSocios.html');
});

app.get('/usuarios', (req, res, next) => {
	req.DB = DB;
	return res.json(req.DB.user);
});

// Arranca el servidor
app.listen(port, () => {
	console.log(`Servidor Express escuchando en el puerto ${port}`);
});

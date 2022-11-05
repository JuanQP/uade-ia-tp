// Controllers
const express = require('express');
const mockController = require('../controllers/mock.controller');
const contenidoController = require('../controllers/contenido.controller');
const carruselController = require('../controllers/carrusel.controller');
const authController = require('../controllers/auth.controller');
const generoController = require('../controllers/genero.controller');
const maturityRatingController = require('../controllers/maturity_rating.controller');
const routes = express.Router();
const { verifyAuth } = require('./utils');

module.exports = (app) => {
	app.use('/api', routes);

	routes.get('/', async (_, res) => res.status(200).send({
		message: "Hello from server!",
	}));

	//Login
	routes.post('/login', authController.login);
	routes.post('/logout', authController.logout);
	routes.post('/register', verifyAuth, authController.register);
	routes.post('/verify', verifyAuth, authController.verify);

	// Géneros
	routes.get('/generos', generoController.list);
	routes.get('/generos/:id', generoController.get);

	// Maturity ratings
	routes.get('/maturity-ratings', maturityRatingController.list);
	routes.get('/maturity-ratings/:id', maturityRatingController.get);

	// Contenidos
	routes.get('/contenidos', contenidoController.list);
	routes.get('/contenidos/:id', contenidoController.get);
	routes.post('/contenidos', verifyAuth, contenidoController.create);
	routes.patch('/contenidos/:id', verifyAuth, contenidoController.patch);
	routes.delete('/contenidos/:id', verifyAuth, contenidoController.delete);

	// Carruseles
	routes.get('/carruseles', carruselController.list);
	routes.get('/carruseles/:id', carruselController.get);
	routes.post('/carruseles', verifyAuth, carruselController.create);
	routes.patch('/carruseles/:id', verifyAuth, carruselController.patch);
	routes.delete('/carruseles/:id', verifyAuth, carruselController.delete);

	/*
	contenido por id
	carrusel por id (con sus contenidos)
	crear y actualizar contenido
	crear y actualizar carrusel
	*/

	// Mocks contenidos
	routes.get('/mocks/contenidos', mockController.contenidosList);
	routes.get('/mocks/contenidos/:id', mockController.contenidoGet);

	// Mocks carruseles
	routes.get('/mocks/carruseles', mockController.carruselesList);
	routes.get('/mocks/carruseles/:id', mockController.carruselesGet);

};

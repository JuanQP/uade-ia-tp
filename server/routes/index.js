// Controllers
const express = require('express');
const mockController = require('../controllers/mock.controller');
const contenidoController = require('../controllers/contenido.controller');
const carruselController = require('../controllers/carrusel.controller');
const authController = require('../controllers/auth.controller');
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

	// Contenidos
	routes.get('/contenidos', contenidoController.list);
	routes.post('/contenidos', verifyAuth, contenidoController.create);
	routes.get('/contenidos/:id', verifyAuth, contenidoController.get);
	routes.patch('/contenidos/:id', verifyAuth, contenidoController.patch);
	routes.delete('/contenidos/:id', verifyAuth, contenidoController.delete);

	// Carruseles
	routes.get('/carruseles', carruselController.list);
	routes.post('/carruseles', verifyAuth, carruselController.create);
	routes.get('/carruseles/:id', verifyAuth, carruselController.get);
	routes.patch('/carruseles/:id', verifyAuth, carruselController.patch);
	routes.delete('/carruseles/:id', verifyAuth, carruselController.delete);

	/*
	contenido por id
	carrusel por id (con sus contenidos)
	crear y actualizar contenido
	crear y actualizar carrusel
	*/

  // Mocks
  routes.get('/mocks/contenidos', mockController.contenidosList);
  routes.get('/mocks/carruseles', mockController.carruselesList);

};

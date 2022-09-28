// Controllers
const express = require('express');
const mockController = require('../controllers/mock.controller');
const contenidoController = require('../controllers/contenido.controller');
const carruselController = require('../controllers/carrusel.controller');
const routes = express.Router();

module.exports = (app) => {
	app.use('/api', routes);

	routes.get('/', async (_, res) => res.status(200).send({
		message: "Hello from server!",
	}));

	// Contenidos
	routes.get('/contenidos', contenidoController.list);
	routes.post('/contenidos', contenidoController.create);
	// Carruseles
	routes.get('/carruseles', carruselController.list);

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

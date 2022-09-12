// Controllers
const express = require('express');
const mockController = require('../controllers/mock.controller');
const contenidoController = require('../controllers/contenido.controller');
const routes = express.Router();

module.exports = (app) => {
	app.use('/api', routes);

	routes.get('/', async (_, res) => res.status(200).send({
		message: "Hello from server!",
	}));

	// Contenido
	routes.get('/contenidos', contenidoController.list);

  // Mocks
  routes.get('/mocks/contenidos', mockController.contenidosList);
  routes.get('/mocks/landing-pages', mockController.landingPagesList);

};

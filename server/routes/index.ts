// Controllers
import express from 'express'
import * as authController from '../controllers/auth.controller'
import * as carruselController from '../controllers/carrusel.controller'
import * as contenidoController from '../controllers/contenido.controller'
import * as generoController from '../controllers/genero.controller'
import * as maturityRatingController from '../controllers/maturityRating.controller'
import * as mockController from '../controllers/mock.controller'
import { verifyAuth } from '../routes/utils'
const routes = express.Router()

export default function (app: express.Express) {
	app.use('/api', routes);

	routes.get('/', async (_, res) => res.status(200).send({
		message: "Hello from server!",
	}));

	//Login
	routes.get('/users', verifyAuth, authController.list);
	routes.post('/login', authController.login);
	routes.post('/logout', authController.logout);
	routes.post('/register', verifyAuth, authController.register);
	routes.post('/verify', verifyAuth, authController.verify);
	routes.delete('/users', verifyAuth, authController.remove)

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
	routes.delete('/contenidos/:id', verifyAuth, contenidoController.remove);

	// Carruseles
	routes.get('/carruseles', carruselController.list);
	routes.get('/carruseles/:id', carruselController.get);
	routes.post('/carruseles', verifyAuth, carruselController.create);
	routes.patch('/carruseles/:id', verifyAuth, carruselController.patch);
	routes.delete('/carruseles/:id', verifyAuth, carruselController.remove);

	// Mocks contenidos
	routes.get('/mocks/contenidos', mockController.contenidosList);
	routes.get('/mocks/contenidos/:id', mockController.contenidoGet);

	// Mocks carruseles
	routes.get('/mocks/carruseles', mockController.carruselesList);
	routes.get('/mocks/carruseles/:id', mockController.carruselesGet);

};

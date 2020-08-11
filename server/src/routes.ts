import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';
import SessionsController from './controllers/SessionsController';
import ProfilesController from './controllers/ProfilesController';
import ensureAuthenticated from './middlewares/ensureAuthenticated';


const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();
const sessionsController = new SessionsController();
const profilesController = new ProfilesController();


routes.post('/users', usersController.create);

routes.post('/sessions', sessionsController.create);

routes.post('/profiles', ensureAuthenticated, profilesController.create);
routes.put('/profiles', ensureAuthenticated, profilesController.update);

routes.get('/classes', ensureAuthenticated, classesController.index);

routes.post('/connections', ensureAuthenticated, connectionsController.create);
routes.get('/connections', ensureAuthenticated, connectionsController.index);

export default routes;
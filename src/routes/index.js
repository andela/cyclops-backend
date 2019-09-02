import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../public/docs/swaggerDoc.json';
import user from './user';
import tripRequest from './tripRequest';
import office from './office';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to the Cyclops Barefoot Nomad backend API'
  }));

  app.use('/api/v1', user, tripRequest, office);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.all('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: error.message
    });
  });
};

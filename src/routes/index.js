import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../public/docs/swaggerDoc.json';
import user from './user';

export default (app) => {
  app.get('/api/v1', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to the Cyclops Barefoot Nomad backend API'
  }));
  app.use('/api/v1/auth', user);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.get('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));

  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: error.message
    });
  });
};

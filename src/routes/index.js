/* eslint-disable require-jsdoc */
/* eslint-disable quote-props */
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../public/docs/swaggerDoc.json';

import user from './user';
import trip from './trip';
import accommodation from './accommodation';
import office from './office';
import notifications from './notifications';
import comment from './comment';

export default (app) => {
  app.get('/', (req, res) => res.status(200).send({
    status: 'success',
    data: 'Welcome to the Cyclops Barefoot Nomad backend API'
  }));

  app.use('/api/v1', [user, trip, office, comment]);

  // Add notification endpoints to application
  app.use('/api/v1/notifications', notifications);
  app.use('/api/v1', [user, trip, office, accommodation]);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

  app.all('/*', (req, res) => res.status(404).send({
    status: 'error',
    error: 'This route is unavailable on this server'
  }));

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    // don't print stack traces in production environment
    // eslint-disable-next-line no-console
    if (app.get('env') !== 'production') console.log(error.stack);
    res.status(error.status || 500);
    res.send({
      status: 'error',
      error: 'Internal Server Error'
    });
  });
};

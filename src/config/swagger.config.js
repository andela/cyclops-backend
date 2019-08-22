// Swagger definition
export const swaggerDefinition = {
  swagger: '2.0',
  info: {
    description: 'Making company travel and accomodation easy and convenient.',
    version: '1.0.0',
    title: 'Barefoot Nomad',
    contact: {
      email: 'cyclops@andela.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  basePath: '/',
  tags: [
    {
      name: 'Landing',
      description: 'Barefoot Nomad landing'
    },
    {
      name: 'Authentication',
      description: 'Registers and login users'
    }
  ],
  schemes: [
    'https',
    'http'
  ]
};

// options for the swagger docs
export const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['../../public/docs/**/*.json']
};

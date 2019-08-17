import { config } from 'dotenv';

config();

export default {
  development: {
    url: process.env.DATABASE_URL_DEV,
    dialect: 'postgres'
  },
  test: {
    url: process.env.DATABASE_URL_TEST,
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL_PROD,
    dialect: 'postgres'
  }
};

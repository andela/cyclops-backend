import { config } from 'dotenv';

config();

export default {
  development: {
    use_env_variable: process.env.DATABASE_URL_DEV,
    dialect: 'postgres'
  },
  test: {
    use_env_variable: process.env.DATABASE_URL_TEST,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: process.env.DATABASE_URL_PROD,
    dialect: 'postgres'
  }
};

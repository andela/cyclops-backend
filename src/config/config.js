const dotenv = require("dotenv");
const url = require("url");

dotenv.config();

const { DATABASE_URL_DEV } = process.env;
const parsedUrl = url.parse(DATABASE_URL_DEV);

module.exports = {
  development: {
    username: parsedUrl.auth.split(":")[0],
    password: parsedUrl.auth.split(":")[1],
    database: parsedUrl.pathname.slice(1),
    host: parsedUrl.hostname,
    port: Number.parseInt(parsedUrl.port, 10),
    dialect: "postgres"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    port: "5432",
    dialect: "postgres"
  }
};

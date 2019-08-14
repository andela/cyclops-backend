import { config } from "dotenv";
import { Pool } from "pg";
import  envVariables  from "../config/config";

config();

const env = process.env.NODE_ENV || "development";

const { username, password, host, database, port } = envVariables[env];

const db = new Pool({
  user: username,
  password: password,
  host: host,
  database: database,
  port: port,
  max: 10,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 3000
});

db
  .connect()
  .then(console.log(`Establishing Connection....\n Connected to ${env} database`))
  .catch(err =>
    console.log(`Error connecting to database.\n Error Details: ${err}`)
  );

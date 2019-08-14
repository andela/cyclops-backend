Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web. 

### Using `dotenv` for environment variables
#### step 1
Install dotenv if not installed as a project dependency.

`npm install dotenv --save`

#### step 2
Create `.env` file in root directory of the project.

Navigate to project root and run the command `touch .env`.

#### step 3
Add environment variables on seperate lines in the `.env` file from step 2.

Example:

`.env`

    NODE_ENV=develop
    DB_HOST=localhost
    DB_USER=sample_user_name
    DB_PASS=sample_database_password

#### step 4
Require and configure dotenv before use.

Example:

`db.config.js`

    require('dotenv').config() // require and configure dotenv package.

    const db = require('db')

    db.connect({
      host: process.env.DB_HOST, // example usage of DB_HOST environment variable from .env file.
      username: process.env.DB_USER,
      password: process.env.DB_PASS
    })

---

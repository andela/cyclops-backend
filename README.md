Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com) [![Coverage Status](https://coveralls.io/repos/github/andela/cyclops-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/cyclops-backend?branch=develop)
[![Build Status](https://travis-ci.com/andela/cyclops-backend.svg?branch=develop)](https://travis-ci.com/andela/cyclops-backend)
## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web. 

## Using dotenv
#### step 1
Install `dotenv` package as a project dependency
`install dotenv --save` 

#### step 2
Create `.env` file in project root directory.
Navigate to root of project and run `touch .env`

#### step 3
Add environment variables to `.env` file
    
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=s1mpl3


#### step 4
Require and configure `dotenv` package

    require('dotenv').config()

    const db = require('db')
    db.connect({
      host: process.env.DB_HOST, // Example access to environment variables
      username: process.env.DB_USER,
      password: process.env.DB_PASS
    })

---

#### Database migration

- To connect to database, modify database.json file in /src/config and include your DB parameters or add DATABASE_URL env.

- Run the command 'node_modules/.bin/sequelize db:migrate' to migrate the dummy user table.

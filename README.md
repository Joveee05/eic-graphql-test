# Elements International Consulting Movie Library API

## About

GraphQL movie library showing the fields and relationships to describe these models.

- Movies
- Actors
- Authors
- Queries and mutations for: create, read, update and delete

This API was built using :

- NodeJs
- Express
- Sequelize
- GraphQL
- GraphiQL
- PostgreSQL
- Vercel

## Usage

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/Joveee05/eic-graphql-test.git

# Navigate into the cloned repository
$ cd into the currently cloned directory

# Install dependencies
$ npm install

# Create .env file for environmental variables in your root directory like the config.env file and provide the keys

# Run the app
$ npm start

```

## PostgreSQL Installation

1.  Create a postgreSQL Database for current project.

2.  Configure environment by creating **_.env_** file

- **_cp .env.example .env_**

And configure your own .env

- DB_USER=postgres
- DB_HOST=dbhost
- DB_PORT=5432
- DB_NAME=dbname
- DB_PASSWD=dbpassword
- CONNECTION_STRING=postgres://username:password@host:yourport

3.  Install Postgre dependecy if you use Postgre as DBMS.

> **_yarn add pg_** or **_npm install pg_**

4.  Run project

> **_npm start_**

## EndPoints

```bash

GET https://localhost:5000/graphql

```

## Example Query

```
{
   movies{
    title
    location
    year
    genre
    actor{
        name
        age
        birthPlace
        gender
    }
   }
}
```

## Example Mutation

```
mutation{
    addActor(name: "Brian Etaghene" age: "45" birthPlace: "London" gender: "Male") {
        id
        name
        age
        gender
        birthPlace
    }
}
```

## Author

**©️ Brian E. Etaghene**

## License

**ISC**

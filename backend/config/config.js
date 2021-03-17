require('dotenv').config()

const { DATABASE, DB_USER, DB_PASS, DB_HOST} = process.env

module.exports = {
  "development": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": `${DATABASE}_development`,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": `${DATABASE}_test`,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": `${DATABASE}_production`,
    "host": DB_HOST,
    "dialect": "postgres"
  }
}

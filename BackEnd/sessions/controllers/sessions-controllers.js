//HTTP errors
const HttpError = require("../../models/http-error");
//API REQUESTS
const fetch = require("node-fetch");
//PostgreSQL connection
const bcrypt = require("bcryptjs");


//POSTGRESQL CONNECTION POOL
const Pool = require("pg").Pool;

const pool = new Pool({
  user: `${process.env.API_POSTGRESQL_USERNAME}`,
  host: process.env.API_POSTGRESQL_HOST,
  database: `${process.env.API_POSTGRESQL_DATABASE}`,
  password: `${process.env.API_POSTGRESQL_PASSWORD}`,
  port: process.env.API_POSTGRESQL_PORT,
});


//Controllers:
//
// - signUpController
// - signInController - FingerprintJS PRO feature

const signUpController = async (req, res, next) => {
 

};

const signInController = async (req, res, next) => {
  
};

exports.signUpController = signUpController;
exports.signInController = signInController;

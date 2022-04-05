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
  const { email, password, visitorId } = req.body;

  //First Process: Never store password in plain text
  const hashedPass = await bcrypt.hash(password, 12);

  //Second Process: Add new user to database, check for duplicates
  pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, hashedPass],
    (error, results) => {
      if (error) {
        if (error.code === "23505") {
          return next(new HttpError("This email is alredy registered.", 404));
        }
        return next(
          new HttpError("Error trying to INSERT user, try again.", 404)
        );
      }

      res.status(201).json(`Account Created!`);
    }
  );
};

const signInController = async (req, res, next) => {
  const { email, password, visitorId } = req.body;
  let getVisitorInfoFingerPrintJS = undefined;
  let isNewBrowser = undefined;

  //--
  //First process: Check in the persisted data if the user has 5 failed attempts in the last 5 minutes.

  //--
  //Second process: Make use of FingerprintJS Pro to verify is this browser is new to my WebPage.
  //A get petition to /visitoris/<visitorId>?api_key=ShKyYQhDzEc2ZEHRKp6V
  try {
    getVisitorInfoFingerPrintJS = await fetch(
      `https://api.fpjs.io/visitors/${visitorId}?api_key=ShKyYQhDzEc2ZEHRKp6V`
    );
    getVisitorInfoFingerPrintJS = await getVisitorInfoFingerPrintJS.json();
  } catch (err) {
    return next(new HttpError("Error in API petition", 404));
  }

  //Conditional: Check if new browser
  if (!getVisitorInfoFingerPrintJS.visits.length) {
    isNewBrowser = true;
  }

  //--
  //Third process: Verify the email is valid (is found on the users table registry)

  //A petition postgreSQL database to verify the existence of the email address
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!rows.length) {
      return next(new HttpError("This email is not valid!", 404));
    }

    isEmailValid = true;
    userData = rows[0];
  } catch (err) {
    return next(new HttpError("Error in postgreSQL action!", 404));
  }



  //-
  //Fourth Process: If the email is valid (validation done in -previous process-), check if the password is correct (bcrypt.js)
  //The checking is between the password sent by the user and the one on the database after descrypted by bcrypt.js
  isUserAuthenticated = await bcrypt.compare(password, userData.password);


  //--  
  //Fifth Process: If user is not authenticated, a new log is saved with the email, visitorId, and TimeStamp
  //If the user is authenticated, a new log is saved with successfull: true
  
  if(!isUserAuthenticated){

    try {
      await pool.query("INSERT INTO login_attempts (email, visitor_id, successfull) VALUES ($1, $2, $3)", [email, visitorId, false])    
    } catch(err){
      console.log("error")
      console.log(err)
      return next(new HttpError("Error saving failed login attempt!", 404));
    }
    
    return next(new HttpError(`New failed login attempt saved!`, 404));

  }


  if(isUserAuthenticated){

    try {
      await pool.query("INSERT INTO login_attempts (email, visitor_id, successfull) VALUES ($1, $2, $3)", [email, visitorId, true])    
    } catch(err){
      return next(new HttpError("Error saving success login attempt!", 404));
    }

    res.status(201).json(`Succesfull login attempt saved!`);    
  } 



};

exports.signUpController = signUpController;
exports.signInController = signInController;

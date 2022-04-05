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
    } catch (err){
        return next(new HttpError("Error in API petition", 404));
    }
    
    //Conditional: Check if new browser
    if (!getVisitorInfoFingerPrintJS.visits.length) {
    isNewBrowser = true;
    }
    

  
};


exports.signUpController = signUpController;
exports.signInController = signInController;

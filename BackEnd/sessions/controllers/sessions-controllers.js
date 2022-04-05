//HTTP errors
const HttpError = require("../../models/http-error");
//API REQUESTS
const fetch = require("node-fetch");
//Encrypted password
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
          return res.status(404).json({error: "This email is alredy registered." });
        }
        return res.status(404).json({error: "Error trying to INSERT user, try again." });
      }

      res.status(200).json({
        accountCreated: true
      });
      
    }
    );
  };

const signInController = async (req, res, next) => {
  const { email, password, visitorId } = req.body;
  let isEmailValid = undefined;
  let isUserAuthenticated = undefined;
  let userData = undefined;
 

  //--
  //First process: Check in the persisted data if the user has 5 failed attempts in the last 5 minutes.
  //Check if more than 1 visitorId is stored in the 5 attempts (Spoofing attempt).
  try {
    const { rows } = await pool.query("  SELECT * FROM login_attempts WHERE time_attempt >= NOW() - INTERVAL '5 minutes' AND successfull = false AND email = $1", [email])
    
    if(rows.length >= 5){
      const tempVisitorID = [];

      rows.forEach(log_attempt =>{
        tempVisitorID.push(log_attempt.visitor_id)
      });

      const checkVisitorIdSpoofing = [...new Set(tempVisitorID)];

      if(checkVisitorIdSpoofing.length > 1){
        return res.status(404).json({error: "This might be a spoofing attempt! Account Disabled!." });
      }

      return res.status(404).json({error: "Too much attempts!, Try again later." });

    }

  }catch(err){
      console.log(err)
      return res.status(404).json({error: "Error trying to get login attempts." });
  }


  //--
  //Second process: Verify the email is valid (is found on the users table registry)

  //A petition postgreSQL database to verify the existence of the email address
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!rows.length) {
      return res.status(404).json({error: "This email is not valid!" });
    }

    isEmailValid = true;
    userData = rows[0];
  } catch (err) {
    return res.status(404).json({error: "Error in postgreSQL action!" });
  }



  //-
  //Third Process: If the email is valid (validation done in -previous process-), check if the password is correct (bcrypt.js)
  //The checking is between the password sent by the user and the one on the database after descrypted by bcrypt.js
  isUserAuthenticated = await bcrypt.compare(password, userData.password);


  //--  
  //Fourth Process: If user is not authenticated, a new log is saved with the email, visitorId, and TimeStamp
  //If the user is authenticated, a new log is saved with successfull: true
  
  if(!isUserAuthenticated){

    try {
      await pool.query("INSERT INTO login_attempts (email, visitor_id, successfull) VALUES ($1, $2, $3)", [email, visitorId, false])    
    } catch(err){
      return res.status(404).json({error: "Error saving failed login attempt!" });
    }
    
    
    return res.status(404).json({error: "New failed login attempt saved!" });
    
  }
  
  
  if(isUserAuthenticated){
    
    try {
      await pool.query("INSERT INTO login_attempts (email, visitor_id, successfull) VALUES ($1, $2, $3)", [email, visitorId, true])    
    } catch(err){
      return res.status(404).json({error: "Error saving success login attempt!" });
    }
    
    res.status(201).json({authenticated: true});    
  } 



};

exports.signUpController = signUpController;
exports.signInController = signInController;

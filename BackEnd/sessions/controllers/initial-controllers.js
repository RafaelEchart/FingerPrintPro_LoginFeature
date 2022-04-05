//HTTP errors
const HttpError = require("../../models/http-error");
//API REQUESTS
const fetch = require("node-fetch");


//POSTGRESQL CONNECTION POOL
const Pool = require("pg").Pool;

const pool = new Pool({
  user: `${process.env.API_POSTGRESQL_USERNAME}`,
  host: process.env.API_POSTGRESQL_HOST,
  database: `${process.env.API_POSTGRESQL_DATABASE}`,
  password: `${process.env.API_POSTGRESQL_PASSWORD}`,
  port: process.env.API_POSTGRESQL_PORT,
});


const initialController = async (req, res, next) => {

  const { visitorId } = req.body;

  console.log("here")
  console.log(visitorId)


  let getVisitorInfoFingerPrintJS = undefined;

  
  try {
    getVisitorInfoFingerPrintJS = await fetch(
      `https://api.fpjs.io/visitors/${visitorId}?api_key=ShKyYQhDzEc2ZEHRKp6V`
      );
    getVisitorInfoFingerPrintJS = await getVisitorInfoFingerPrintJS.json();
  } catch (err) {
    console.log(err)
    return next(new HttpError("Error in API petition", 404));
  }

  

  res.status(201).json({
    getVisitorInfoFingerPrintJS
  });    

};


exports.initialController = initialController;

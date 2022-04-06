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

const verifyDeviceController = async (req, res, next) => {
  const { email, visitorId } = req.body;


    pool.query(
    "INSERT INTO trusted_devices (email, visitor_id) VALUES ($1, $2)",
    [email, visitorId],
    (error, results) => {
      if (error) {
        return res.status(404).json({error: "Error trying to save this device, try again!" });
      }

      res.status(200).json({
        deviseVerified: true
      });
      
    }
    );
  };


exports.verifyDeviceController = verifyDeviceController;


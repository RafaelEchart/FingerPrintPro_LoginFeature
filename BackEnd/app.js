// Express and bodyParser for connection
const express = require("express");
const bodyParser = require("body-parser");

//HTTP errors
const HttpError = require("./models/http-error");

//Sessions
const sessionsRoutes = require("./sessions/routes/sessions-routes");


const app = express();

app.use(bodyParser.json());

//CORS option for the backend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});


//API - SESSIONS
app.use("/api", sessionsRoutes);

//Routes not found
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});


app.listen(3001, () => {
  console.log(`App running on port 3001.`)
})


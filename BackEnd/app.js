// Express and bodyParser for connection
const express = require("express");
const bodyParser = require("body-parser");

//HTTP errors
const HttpError = require("./models/http-error");

//Sessions
const sessionsRoutes = require("./sessions/routes/sessions-routes");


const app = express();

app.use(bodyParser.json());


//API - SESSIONS
app.use("/api", sessionsRoutes);


app.listen(3001, () => {
  console.log(`App running on port 3001.`)
})


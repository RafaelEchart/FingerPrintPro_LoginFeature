const express = require("express");


const sessionsControllers = require("../controllers/sessions-controllers");
const initialControllers = require("../controllers/initial-controllers");

const router = express.Router();

//Initial Route
router.post("/", initialControllers.initialController);

//Login Route
router.post("/signup", sessionsControllers.signUpController);
router.post("/login", sessionsControllers.signInController);




//EXPORT ROUTER
module.exports = router;


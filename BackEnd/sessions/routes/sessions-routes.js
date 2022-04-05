const express = require("express");


const sessionsControllers = require("../controllers/sessions-controllers");

const router = express.Router();

//Login Route
router.post("/signup", sessionsControllers.signUpController);
router.post("/login", sessionsControllers.signInController);



//EXPORT ROUTER
module.exports = router;


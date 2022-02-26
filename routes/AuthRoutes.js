const router = require("express").Router();

import { UserLogin, UserRegistration } from "../controllers/AuthController.js";

router.post("/login", UserLogin);
router.post("/register", UserRegistration);

module.exports = router;

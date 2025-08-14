const { Router } = require("express");
const { userController } = require("../controllers");
const {
  validateRegistration,
} = require("../middlewares/validation-middleware");
const router = Router();

router.post("/register", validateRegistration, userController.registerUser);

module.exports = router;

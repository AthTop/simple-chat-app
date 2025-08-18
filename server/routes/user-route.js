const { Router } = require("express");
const { userController } = require("../controllers");
const {
  validateRegistration,
} = require("../middlewares/validation-middleware");
const { authenticateUser } = require("../middlewares/api-auth-middleware");
const router = Router();

router.get("/me", authenticateUser, userController.getUser);
router.post("/register", validateRegistration, userController.registerUser);

module.exports = router;

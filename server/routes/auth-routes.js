const { Router } = require("express");
const { authController } = require("../controllers/");
const { validateLogin } = require("../middlewares/validation-middleware");
const router = Router();

router.post("/login", validateLogin, authController.loginUser);
router.post("/logout", authController.logoutUser);

module.exports = router;

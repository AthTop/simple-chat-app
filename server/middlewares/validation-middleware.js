const { body } = require("express-validator");

const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3 to 15 characters long"),
  body("password")
    .trim()
    .isStrongPassword({
      minLength: 3,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "Password must be at least 3 characters, contain 1 uppercase, 1 lowercase, 1 number"
    ),
  body("confirmPassword")
    .trim()
    .custom((confirmPassword, { req }) => {
      return confirmPassword === req.body.password;
    })
    .withMessage("Passwords must match"),
];

module.exports = {
  validateRegistration,
};

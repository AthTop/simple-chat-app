const { validationResult } = require("express-validator");
const userService = require("../services/user-service");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "One or more fields do not meet the requirements",
      validationErrors: errors.array(),
    });
  }
  try {
    const { username, password } = req.body;
    if (await userService.userExists(username)) {
      return res.status(409).json({
        success: false,
        message: "The provided username is already in use.",
        validationErrors: [
          {
            path: "username",
            message: "Username is already in use.",
          },
        ],
      });
    }
    const user = await userService.registerUser(username, password);
    if (user) {
      res.status(201).json({ success: true, user: user });
    }
  } catch (e) {
    next(e);
  }
};

const getUser = (req, res, next) => {
  const user = req.user;
  return res
    .status(201)
    .json({
      success: true,
      user: { username: user.username, id: user.id, status: user.status },
    });
};

module.exports = {
  registerUser,
  getUser,
};

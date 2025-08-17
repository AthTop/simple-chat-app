const { verifyUser, issueJWT } = require("../services/auth-service");
const { validationResult } = require("express-validator");

const loginUser = async (req, res, next) => {
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
    const user = await verifyUser(username, password);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password." });
    }
    const jwtToken = issueJWT(user);
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        status: user.status,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { loginUser, logoutUser };

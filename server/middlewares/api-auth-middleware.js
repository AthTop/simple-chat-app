const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { userQueries } = require("../db");
const { message } = require("../db/prisma");

const authenticateUser = async (req, res, next) => {
  try {
    const cookieString = req.headers.cookie;
    if (!cookieString) {
      return res
        .status(401)
        .json({ success: false, message: "No cookies provided" });
    }

    const cookies = cookie.parse(cookieString);
    const token = cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token not found" });
    }

    jwt.verify(token, process.env.SECRET, async (e, decoded) => {
      if (e) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token", e });
      }
      const user = await userQueries.getUserById(decoded.sub.id);
      req.user = user;
      next();
    });
  } catch (e) {
    return next(e);
  }
};

module.exports = { authenticateUser };

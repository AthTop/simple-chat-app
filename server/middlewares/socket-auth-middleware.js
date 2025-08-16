const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const { userQueries } = require("../db/index");

const authenticateSocket = (socket, next) => {
  try {
    const cookieString = socket.request.headers.cookie;
    if (!cookieString) {
      return next(new Error("AUTH_ERROR: No cookies provided"));
    }

    const cookies = cookie.parse(cookieString);
    const token = cookies.token;
    if (!token) {
      return next(new Error("AUTH_ERROR: Token not found"));
    }

    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        return next(new Error("AUTH_ERROR: Invalid token."));
      }
      const user = await userQueries.getUserById(decoded.sub.id);
      socket.user = user;
      next();
    });
  } catch (e) {
    return next(new Error("AUTH_ERROR: Something went wrong."));
  }
};

module.exports = { authenticateSocket };

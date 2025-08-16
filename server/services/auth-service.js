const { userExists } = require("./user-service");
const { validatePassword } = require("../utils/password-utils");
const jsonwebtoken = require("jsonwebtoken");

const verifyUser = async (username, password) => {
  const user = await userExists(username);
  if (!user) {
    return null;
  }
  const confirmPassword = await validatePassword(password, user.passwordHash);
  if (!confirmPassword) {
    return null;
  }
  return user;
};

const issueJWT = (user) => {
  const expiresIn = "7d";
  const payload = {
    sub: { id: user.id },
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: expiresIn,
  });

  return signedToken;
};

module.exports = { verifyUser, issueJWT };

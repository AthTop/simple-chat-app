const { userQueries } = require("../db");
const { hashPassword } = require("../utils/password-utils");

const registerUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);
  const user = await userQueries.createUser(username, hashedPassword);
  return user;
};

const userExists = async (username) => {
  return await userQueries.getUserByUsername(username);
};

module.exports = {
  registerUser,
  userExists,
};

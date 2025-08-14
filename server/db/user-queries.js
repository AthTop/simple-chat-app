const prisma = require("./prisma");

const createUser = async (username, passwordHash) => {
  const user = await prisma.user.create({
    data: {
      username: username,
      passwordHash: passwordHash,
    },
    select: {
      id: true,
      username: true,
    },
  });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  return user;
};

module.exports = {
  createUser,
  getUserByUsername,
};

const prisma = require("./prisma");

const getMessages = async (roomId) => {
  const messages = await prisma.message.findMany({
    where: { roomId: roomId },
    orderBy: { timestamp: desc },
    take: 50,
    include: {
      sender: {
        select: {
          username: true,
        },
      },
    },
  });
  return messages;
};

module.exports = { getMessages };

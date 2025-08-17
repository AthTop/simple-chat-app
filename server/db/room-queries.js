const prisma = require("./prisma");

const seedPublicRoom = async () => {
  const publicRoom = await prisma.room.findUnique({
    where: { name: "Public" },
  });

  if (!publicRoom) {
    await prisma.room.create({
      data: {
        name: "Public",
        isPrivate: false,
      },
    });
  }
};

const getRoomByName = async (roomName) => {
  const room = await prisma.room.findUnique({
    where: { name: roomName },
  });
  return room;
};

module.exports = { seedPublicRoom, getRoomByName };

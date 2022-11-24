import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const test = async (req, res) => {
  const test = await prisma.labPanelTest.findMany({
    where: {
      panelId: 3,
    },
  });

  res.json(test[0].testId);
};

export default test;

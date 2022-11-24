import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createTitle = async (req, res) => {
  const { Title, Abbreviation, Description, CreatedBy, IsActive } = req.body;

  const data = await prisma.Title.create({
    data: {
      Title,
      Abbreviation,
      Description,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllTitle = async (req, res) => {
  const data = await prisma.Title.findMany({});

  res.json(data);
};

const getTitle = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Title.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateTitle = async (req, res) => {
  const { id } = req.params;
  const { Title, Abbreviation, Description, IsActive } = req.body;

  const data = await prisma.Title.update({
    where: { id: Number(id) },
    data: {
      Title,
      Abbreviation,
      Description,
      IsActive,
    },
  });
  res.json(data);
};

const deleteTitle = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Title.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export { createTitle, deleteTitle, getAllTitle, getTitle, updateTitle };

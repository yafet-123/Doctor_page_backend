import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createIdtype = async (req, res) => {
  const { IdType, IdDescription, CreatedBy, IsActive } = req.body;

  const data = await prisma.IdType.create({
    data: {
      IdType,
      IdDescription,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllIdtype = async (req, res) => {
  const data = await prisma.IdType.findMany({});

  res.json(data);
};

const getIdtype = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.IdType.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateIdtype = async (req, res) => {
  const { id } = req.params;
  const { IdType, IdDescription, IsActive } = req.body;

  const data = await prisma.IdType.update({
    where: { id: Number(id) },
    data: {
      IdType,
      IdDescription,
      IsActive,
    },
  });
  res.json(data);
};

const deleteIdtype = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.IdType.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export { createIdtype, deleteIdtype, getAllIdtype, getIdtype, updateIdtype };

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createOccupation = async (req, res) => {
  const {
    Occupation_List,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.Occupations.create({
    data: {
        Occupation_List,
        CreatedBy,
        IsActive,
    },
  });

  res.json(data);
};

const getAllOccupation = async (req, res) => {
  const data = await prisma.Occupations.findMany({});

  res.json(data);
};

const getOccupation = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Occupations.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateOccupation = async (req, res) => {
  const { id } = req.params;
  const {
    Occupation_List,
    IsActive,
  } = req.body;

  const data = await prisma.Occupations.update({
    where: { id: Number(id) },
    data: {
        Occupation_List,
        IsActive,
    },
  });
  res.json(data);
};

const deleteOccupation = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Occupations.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createOccupation,
  deleteOccupation,
  getAllOccupation,
  getOccupation,
  updateOccupation,
};

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createCountry = async (req, res) => {
  const { CCA2, Name, CCA3, Nationality, CreatedBy, IsActive } = req.body;

  const data = await prisma.Country.create({
    data: {
      CCA2,
      Name,
      CCA3,
      Nationality,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllCountry = async (req, res) => {
  const data = await prisma.Country.findMany({});

  res.json(data);
};

const getCountry = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Country.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateCountry = async (req, res) => {
  const { id } = req.params;
  const { CCA2, Name, CCA3, Nationality, IsActive } = req.body;

  const data = await prisma.Country.update({
    where: { id: Number(id) },
    data: {
      CCA2,
      Name,
      CCA3,
      Nationality,
      IsActive,
    },
  });
  res.json(data);
};

const deleteCountry = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Country.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createCountry,
  deleteCountry,
  getAllCountry,
  getCountry,
  updateCountry,
};

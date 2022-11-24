import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createMeasurement = async (req, res) => {
  const { Name, Symbols, CreatedBy, IsActive } = req.body;

  const data = await prisma.UnitOfMeasurements.create({
    data: {
      Name,
      Symbols,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllMeasurement = async (req, res) => {
  const data = await prisma.UnitOfMeasurements.findMany({});

  res.json(data);
};

const getMeasurement = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.UnitOfMeasurements.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateMeasurement = async (req, res) => {
  const { id } = req.params;
  const { Name, Symbols, IsActive } = req.body;

  const data = await prisma.UnitOfMeasurements.update({
    where: { id: Number(id) },
    data: {
      Name,
      Symbols,
      IsActive,
    },
  });
  res.json(data);
};

const deleteMeasurement = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.UnitOfMeasurements.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createMeasurement,
  deleteMeasurement,
  getAllMeasurement,
  getMeasurement,
  updateMeasurement,
};

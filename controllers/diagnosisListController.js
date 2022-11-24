import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createDiagnosisList = async (req, res) => {
  const { Diagnosis, Code, CreatedBy, IsActive } = req.body;

  const data = await prisma.DiagnosisList.create({
    data: {
      Diagnosis,
      Code,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllDiagnosisList = async (req, res) => {
  const data = await prisma.DiagnosisList.findMany({});

  res.json(data);
};

const getDiagnosisList = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.DiagnosisList.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateDiagnosisList = async (req, res) => {
  const { id } = req.params;
  const { RegionName, CountryId, IsActive } = req.body;

  const data = await prisma.DiagnosisList.update({
    where: { id: Number(id) },
    data: {
      RegionName,
      CountryId,
      IsActive,
    },
  });
  res.json(data);
};

const deleteDiagnosisList = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Region.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createDiagnosisList,
  // deleteDiagnosisList,
  getAllDiagnosisList,
  getDiagnosisList,
  updateDiagnosisList,
};

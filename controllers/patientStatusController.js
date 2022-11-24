import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createPatientStatus = async (req, res) => {
  const {
    Status,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.PatientStatus.create({
    data: {
        Status,
        CreatedBy,
        IsActive,
    },
  });

  res.json(data);
};

const getAllPatientStatus = async (req, res) => {
  const data = await prisma.PatientStatus.findMany({});

  res.json(data);
};

const getPatientStatus = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PatientStatus.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updatePatientStatus = async (req, res) => {
  const { id } = req.params;
  const {
    Status,
    IsActive,
  } = req.body;

  const data = await prisma.PatientStatus.update({
    where: { id: Number(id) },
    data: {
        Status,
        IsActive,
    },
  });
  res.json(data);
};

const deletePatientStatus = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PatientStatus.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createPatientStatus,
  deletePatientStatus,
  getAllPatientStatus,
  getPatientStatus,
  updatePatientStatus,
};

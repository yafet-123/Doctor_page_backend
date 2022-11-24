import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createClinic = async (req, res) => {
  const { ClinicName, Description, CreatedBy, IsActive } = req.body;

  const data = await prisma.ClinicList.create({
    data: {
      ClinicName,
      Description,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllClinics = async (req, res) => {
  const data = await prisma.ClinicList.findMany({orderBy: {id: 'asc'}});

  const all={
    Clinic: data.ClinicName,

  }
  res.json(data);
};

const getClinic = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.ClinicList.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateClinic = async (req, res) => {
  const { id } = req.params;
  const { ClinicName, Description, IsActive } = req.body;

  const data = await prisma.ClinicList.update({
    where: { id: Number(id) },
    data: {
      ClinicName,
      Description,
      IsActive,
    },
  });
  res.json(data);
};

const deleteClinic = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.ClinicList.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export { createClinic, deleteClinic, getAllClinics, getClinic, updateClinic };

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createRadDepartment = async (req, res) => {
  const {
    Name,
    Abbreviation,
    Remark,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.RadDepartment.create({
    data: {
        Name,
    Abbreviation,
    Remark,
    CreatedBy,
    IsActive,
    },
  });

  res.json(data);
};

const getAllRadDepartment = async (req, res) => {
  const data = await prisma.RadDepartment.findMany({});

  res.json(data);
};

const getRadDepartment = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.RadDepartment.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateRadDepartment = async (req, res) => {
  const { id } = req.params;
  const {
    Name,
    Abbreviation,
    Remark,
    IsActive,
  } = req.body;

  const data = await prisma.RadDepartment.update({
    where: { id: Number(id) },
    data: {
        Name,
        Abbreviation,
        Remark,
        IsActive,
    },
  });
  res.json(data);
};

const deleteRadDepartment = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.RadDepartment.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createRadDepartment,
  deleteRadDepartment,
  getAllRadDepartment,
  getRadDepartment,
  updateRadDepartment,
};

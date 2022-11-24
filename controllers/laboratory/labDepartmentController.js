import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createlabDepartment = async (req, res) => {
  const { Name, Abbreviation, Remark, CreatedBy, IsActive } = req.body;

  const data = await prisma.LabDepartment.create({
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

const getAlllabDepartment = async (req, res) => {
  const data = await prisma.LabDepartment.findMany({});

  res.json(data);
};

const getlabDepartment = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.LabDepartment.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updatelabDepartment = async (req, res) => {
  const { id } = req.params;
  const { Name, Abbreviation, Remark, CreatedBy, IsActive } = req.body;

  const data = await prisma.LabDepartment.update({
    where: { id: Number(id) },
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

const deletelabDepartment = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.LabDepartment.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createlabDepartment,
  deletelabDepartment,
  getAlllabDepartment,
  getlabDepartment,
  updatelabDepartment,
};

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createLabPannel = async (req, res) => {
  const {
    PanelsAbbreviation,
    ShortDescription,
    Price,
    DepartmentId,
    StatusId,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.LabTests.create({
    data: {
      PanelsAbbreviation,
      ShortDescription,
      Price,
      DepartmentId,
      StatusId,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllLabTest = async (req, res) => {
  const Tests = await prisma.LabTests.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      UnitOfMeasurements: {
        select: {
          name: true,
        },
      },
    },
  });

  const tests = Tests.map((data) => ({
    id: data.id,
    Name: data.testName,
    Abbreviation: data.abbreviation,
    Description: data.shortDescription,
    UnitOfMeasurement: data.UnitOfMeasurements.name,
    Status: data.IsActive,
  }));

  res.json(tests);
};

const getLabPannel = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.LabPanels.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateLabPannel = async (req, res) => {
  const { id } = req.params;
  const {
    PanelsAbbreviation,
    ShortDescription,
    Price,
    DepartmentId,
    StatusId,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.LabPanels.update({
    where: { id: Number(id) },
    data: {
      PanelsAbbreviation,
      ShortDescription,
      Price,
      DepartmentId,
      StatusId,
      CreatedBy,
      IsActive,
    },
  });
  res.json(data);
};

const deleteLabPannel = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.LabPanels.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createLabPannel,
  deleteLabPannel,
  getAllLabTest,
  getLabPannel,
  updateLabPannel,
};

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

  const data = await prisma.LabPanelTest.create({
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

const getAllLabPanelTest = async (req, res) => {
  const PanelTest = await prisma.LabPanelTest.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      LabPanels: {
        select: {
          panelsAbbreviation: true,
        },
      },
      LabTests: {
        select: {
          testName: true,
        },
      },
    },
  });

  const paneltest = PanelTest.map((data) => ({
    id: data.id,
    Panel: data.LabPanels.panelsAbbreviation,
    Test: data.LabTests.testName,
    Status: data.IsActive,
  }));

  res.json(paneltest);
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
  getAllLabPanelTest,
  getLabPannel,
  updateLabPannel,
};

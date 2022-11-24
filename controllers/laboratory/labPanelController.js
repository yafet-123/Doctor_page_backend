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

  const data = await prisma.LabPanels.create({
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

const getAllLabPannel = async (req, res) => {
  const Panels = await prisma.LabPanels.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      LabDepartment: {
        select: {
          name: true,
        },
      },
    },
  });

  const panels = Panels.map((data) => ({
    id: data.id,
    Name: data.panelsAbbreviation,
    Description: data.shortDescription,
    Department: data.LabDepartment.name,
    Price: data.price,
    Status: data.isActive,
  }));

  res.json(panels);
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
  getAllLabPannel,
  getLabPannel,
  updateLabPannel,
};

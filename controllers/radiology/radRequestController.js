import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createRadRequest = async (req, res) => {
  const {
    RequestName,
    Abbreviation,
    ShortDescription,
    Price,
    RadDepartmentId,
    IsActive,
  } = req.body;

  const data = await prisma.RadRequest.create({
    data: {
      RequestName,
      Abbreviation,
      ShortDescription,
      Price,
      RadDepartmentId,
      CreatedBy: req.user.userId,
      IsActive,
    },
  });

  res.json(data);
};

const getAllRadRequest = async (req, res) => {
  const MRI = await prisma.RadRequest.findMany({
    where:{
      RadDepartmentId: 1
    },
    include:{
      RadDepartment:{
        select:{
          Abbreviation:true,
        }
      }
    }
  });

  const CT = await prisma.RadRequest.findMany({
    where:{
      RadDepartmentId: 2
    },
    include:{
      RadDepartment:{
        select:{
          Abbreviation:true,
        }
      }
    }
  });

  const Xray = await prisma.RadRequest.findMany({
    where:{
      RadDepartmentId: 3
    },
    include:{
      RadDepartment:{
        select:{
          Abbreviation:true,
        }
      }
    }
  });

  const US = await prisma.RadRequest.findMany({
    where:{
      RadDepartmentId: 4
    },
    include:{
      RadDepartment:{
        select:{
          Abbreviation:true,
        }
      }
    }
  });

  const mri = MRI.map(data => ({
    id:data.id,
    Name: data.RequestName,
    Department:data.RadDepartment.Abbreviation
  }),)
  
  const ct = CT.map(data => ({
    id:data.id,
    Name: data.RequestName,
    Department:data.RadDepartment.Abbreviation
  }),)

  const xray = Xray.map(data => ({
    id:data.id,
    Name: data.RequestName,
    Department:data.RadDepartment.Abbreviation
  }),)

  const us = US.map(data => ({
    id:data.id,
    Name: data.RequestName,
    Department:data.RadDepartment.Abbreviation
  }),)

  res.json({
    mri:mri,
    ct:ct,
    xray:xray,
    us:us
  });
};

const getRadRequest = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.RadRequest.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateRadRequest = async (req, res) => {
  const { id } = req.params;
  const {
    RequestName,
    Abbreviation,
    ShortDescription,
    Price,
    RadDepartmentId,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.RadRequest.update({
    where: { id: Number(id) },
    data: {
      RequestName,
      Abbreviation,
      ShortDescription,
      Price,
      RadDepartmentId,
      CreatedBy,
      IsActive,
    },
  });
  res.json(data);
};

const deleteRadRequest = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.RadRequest.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createRadRequest,
  deleteRadRequest,
  getAllRadRequest,
  getRadRequest,
  updateRadRequest,
};

import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createPhoneType = async (req, res) => {
  const {
    PhoneType,
    Description,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.PhoneNumberType.create({
    data: {
      PhoneType,
      Description,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllPhoneType = async (req, res) => {
  const data = await prisma.PhoneNumberType.findMany({});

  res.json(data);
};

const getPhoneType = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PhoneNumberType.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updatePhoneType = async (req, res) => {
  const { id } = req.params;
  const {
    PhoneType,
    Description,
    IsActive,
  } = req.body;

  const data = await prisma.PhoneNumberType.update({
    where: { id: Number(id) },
    data: {
      PhoneType,
      Description,
      IsActive,
    },
  });
  res.json(data);
};

const deletePhoneType = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PhoneNumberType.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createPhoneType,
  deletePhoneType,
  getAllPhoneType,
  getPhoneType,
  updatePhoneType,
};

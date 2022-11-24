import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createRole = async (req, res) => {
  const { AccountType, AccountDescription, CreatedBy, IsActive } = req.body;

  const data = await prisma.AccountGroup.create({
    data: {
      AccountType,
      AccountDescription,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllRoles = async (req, res) => {
  const data = await prisma.AccountGroup.findMany({});

  res.json(data);
};

const getRole = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.AccountGroup.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { AccountType, AccountDescription, IsActive } = req.body;

  const data = await prisma.AccountGroup.update({
    where: { id: Number(id) },
    data: {
      AccountType,
      AccountDescription,
      IsActive,
    },
  });
  res.json(data);
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.AccountGroup.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export { createRole, deleteRole, getAllRoles, getRole, updateRole };

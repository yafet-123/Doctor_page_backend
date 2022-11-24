import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createRelationship = async (req, res) => {
  const {
    RelationshipType,
    Description,
    CreatedBy,
    IsActive,
  } = req.body;

  const data = await prisma.Relationship.create({
    data: {
        RelationshipType,
      Description,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllRelationship = async (req, res) => {
  const data = await prisma.Relationship.findMany({});

  res.json(data);
};

const getRelationship = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Relationship.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateRelationship = async (req, res) => {
  const { id } = req.params;
  const {
    RelationshipType,
    Description,
    IsActive,
  } = req.body;

  const data = await prisma.Relationship.update({
    where: { id: Number(id) },
    data: {
        RelationshipType,
      Description,
      IsActive,
    },
  });
  res.json(data);
};

const deleteRelationship = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Relationship.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createRelationship,
  deleteRelationship,
  getAllRelationship,
  getRelationship,
  updateRelationship,
};

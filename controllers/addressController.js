import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const createRegion = async (req, res) => {
  const { RegionName, CountryId, CreatedBy, IsActive } = req.body;

  const data = await prisma.Region.create({
    data: {
      RegionName,
      CountryId,
      CreatedBy,
      IsActive,
    },
  });

  res.json(data);
};

const getAllAddress = async (req, res) => {
  const data = await prisma.SubCity.findMany({
    include: {
      Region: {
        select: {
          RegionName: true,
          Country: {
            select: {
              Name: true,
            },
          },
        },
      },
    },
  });

  const all = data.map((data) => ({
    Region: data.Region.RegionName,
    Country: data.Region.Country.Name,
  }));

  res.json(data);
};

const getRegion = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Region.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateRegion = async (req, res) => {
  const { id } = req.params;
  const { RegionName, CountryId, IsActive } = req.body;

  const data = await prisma.Region.update({
    where: { id: Number(id) },
    data: {
      RegionName,
      CountryId,
      IsActive,
    },
  });
  res.json(data);
};

const deleteRegion = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Region.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export { createRegion, deleteRegion, getAllAddress, getRegion, updateRegion };

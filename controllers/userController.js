import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  const data = await prisma.Accounts.findMany({
    orderBy: {id: 'desc'},
    include: {
      AccountGroup: {
        select:{
        AccountType: true,
        }
      },
      AccountStatus: {
        select:{
        IsActive: true,
        }
      },
      Accounts: {
        select: {
          FirstName: true,
          MiddleName: true,
          LastName: true,
        },
      },
      AccountInformation: {
        select: {
          IdNumber: true,
          Email: true,
          PhoneNumber: true,
          RegionId: true,
          CountryId: true,
          SubCityId: true,
          ZoneId: true,
          WoredaId: true,
          Kebele: true,
          HouseNumber: true,
          Gender: {
            select: {
              Type: true,
            },
          },
          Title: {
            select:{
            Title: true,
            }
          },
          IdType: {
              select: {
              IdType: true,
            }},
            PhoneNumberType: {
              select: {
              PhoneType: true,
            },
          },
          },
        },
      },
  });

  const all = data.map((data) => ({
    id: data.id,
    Name: `${data.FirstName+" "+data.MiddleName+" "+data.LastName}`,
    FirstName: data.FirstName,
    MiddleName: data.MiddleName,
    LastName: data.LastName,
    UserName: data.UserName,
    Gender: data.AccountInformation.Gender.Type,
    AccountGroup: data.AccountGroup.AccountType,
    Status: `${data.AccountStatus.IsActive}`,
    Title: data.AccountInformation.Title.Title,
    IdType: data.AccountInformation.IdType.IdType,
    PhoneType: data.AccountInformation.PhoneNumberType.PhoneType,
    IdNumber: data.AccountInformation.IdNumber,
    Email: data.AccountInformation.Email,
    PhoneNumber: data.AccountInformation.PhoneNumber,
    Region: data.AccountInformation.RegionId,
    Country: data.AccountInformation.CountryId,
    SubCity: data.AccountInformation.SubCityId,
    Zone: data.AccountInformation.ZoneId,
    Woreda: data.AccountInformation.WoredaId,
    Kebele: data.AccountInformation.Kebele,
    HouseNumber: data.AccountInformation.HouseNumber,
    CreatedBy: `${
      data.Accounts.FirstName +
      " " +
      data.Accounts.MiddleName +
      " " +
      data.Accounts.LastName
    }`,
    CreatedDate: data.CreatedDate,
  }));

  res.json(all);
};

const getTitle = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Accounts.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(data);
};

const updateTitle = async (req, res) => {
  const { id } = req.params;
  const { Title, Abbreviation, Description, IsActive } = req.body;

  const data = await prisma.Title.update({
    where: { id: Number(id) },
    data: {
      Title,
      Abbreviation,
      Description,
      IsActive,
    },
  });
  res.json(data);
};

const deleteTitle = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Title.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export { deleteTitle, getAllUser, getTitle, updateTitle };

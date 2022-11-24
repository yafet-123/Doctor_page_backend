import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const searchPatient = async (req, res) => {
  const { searchName, type } = req.body;
  let result;

  let information = {
    Woreda: {
      select: {
        WoredaName: true,
      },
    },
    Gender: {
      select: {
        Type: true,
      },
    },
    MaritalStatus: {
      select: {
        Status: true,
      },
    },
    Occupations: {
      select: {
        Occupation_List: true,
      },
    },
    Country: {
      select: {
        Name: true,
      },
    },
    Region: {
      select: {
        RegionName: true,
      },
    },
    SubCity: {
      select: {
        FullName: true,
      },
    },
    Zone: {
      select: {
        ZoneName: true,
      },
    },
    PatientEmergencyContact: {
      select: {
        FirstName: true,
        MiddleName: true,
        LastName: true,
        Gender: {
          select: {
            Type: true,
          },
        },
        Relationship: {
          select: {
            RelationshipType: true,
          },
        },
        PhoneNumber: true,
      },
    },
    PatientStatus: {
      select: {
        Status: true,
      },
    },
    Accounts: {
      select: {
        FirstName: true,
        MiddleName: true,
        LastName: true,
      },
    },
  };

  if (type == 1) {
    const data = await prisma.PatientList.findUnique({
      where: {
        id: Number(searchName),
      },
      include: information,
    });
    
    let all =[]
    data !== null ? all = {
      MRN: data.id,
      PreviousMRN: data.PreviousMRN,
      Name: `${data.FirstName + " " + data.MiddleName + " " + data.LastName}`,
      DateOfBirth: data.DateOfBirth,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      Postal: data.Postal,
      Gender: data.Gender.Type,
      MaritalStatus: data.MaritalStatus.Status,
      Occupation: data.Occupations.Occupation_List,
      Country: data.Country.Name,
      Region: data.Region.RegionName,
      SubCity: data.SubCity.FullName,
      Woreda: data.Woreda.WoredaName,
      Zone: data.Zone.ZoneName,
      Kebele: data.Kebele,
      Emergency_Contact: `${
        data.PatientEmergencyContact.FirstName +
        " " +
        data.PatientEmergencyContact.MiddleName +
        " " +
        data.PatientEmergencyContact.LastName
      }`,
      Emergency_Contact_Gender: data.PatientEmergencyContact.Gender.Type,
      Emergency_Contact_Relationship:
        data.PatientEmergencyContact.Relationship.RelationshipType,
      Emergency_Contact_Phonenumber: data.PatientEmergencyContact.PhoneNumber,
      PatientStatus: data.PatientStatus.Status,
      RegistrationDate: data.CreatedDate,
      CreatedBy:
        data.Accounts == null
          ? "No Account Info"
          : `${
              data.Accounts.FirstName +
              " " +
              data.Accounts.MiddleName +
              " " +
              data.Accounts.LastName
            }`,
    } : all;

    result = all;
  } else if (type == 2) {
    const previousMrn = await prisma.PatientList.findMany({
      where: {
        PreviousMRN: {
          contains: searchName,
          mode: "insensitive",
        },
      },
      include: information,
    });

    const all = previousMrn.map((data) => ({
      MRN: data.id,
      PreviousMRN: data.PreviousMRN,
      Name: `${data.FirstName + " " + data.MiddleName + " " + data.LastName}`,
      DateOfBirth: data.DateOfBirth,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      Postal: data.Postal,
      Gender: data.Gender.Type,
      MaritalStatus: data.MaritalStatus.Status,
      Occupation: data.Occupations.Occupation_List,
      Country: data.Country.Name,
      Region: data.Region.RegionName,
      SubCity: data.SubCity.FullName,
      Woreda: data.Woreda.WoredaName,
      Zone: data.Zone.ZoneName,
      Kebele: data.Kebele,
      Emergency_Contact: `${
        data.PatientEmergencyContact.FirstName +
        " " +
        data.PatientEmergencyContact.MiddleName +
        " " +
        data.PatientEmergencyContact.LastName
      }`,
      Emergency_Contact_Gender: data.PatientEmergencyContact.Gender.Type,
      Emergency_Contact_Relationship:
        data.PatientEmergencyContact.Relationship.RelationshipType,
      Emergency_Contact_Phonenumber: data.PatientEmergencyContact.PhoneNumber,
      PatientStatus: data.PatientStatus.Status,
      RegistrationDate: data.CreatedDate,
      CreatedBy:
        data.Accounts == null
          ? "No Account Info"
          : `${
              data.Accounts.FirstName +
              " " +
              data.Accounts.MiddleName +
              " " +
              data.Accounts.LastName
            }`,
    }));

    result = all.sort((a, b) => b.MRN - a.MRN);
  } else if (type == 3) {
    const phoneNumber = await prisma.PatientList.findMany({
      where: {
        PhoneNumber: {
          contains: searchName,
          mode: "insensitive",
        },
      },

      include: information,
    });

    const all = phoneNumber.map((data) => ({
      MRN: data.id,
      PreviousMRN: data.PreviousMRN,
      Name: `${data.FirstName + " " + data.MiddleName + " " + data.LastName}`,
      DateOfBirth: data.DateOfBirth,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      Postal: data.Postal,
      Gender: data.Gender.Type,
      MaritalStatus: data.MaritalStatus.Status,
      Occupation: data.Occupations.Occupation_List,
      Country: data.Country.Name,
      Region: data.Region.RegionName,
      SubCity: data.SubCity.FullName,
      Woreda: data.Woreda.WoredaName,
      Zone: data.Zone.ZoneName,
      Kebele: data.Kebele,
      Emergency_Contact: `${
        data.PatientEmergencyContact.FirstName +
        " " +
        data.PatientEmergencyContact.MiddleName +
        " " +
        data.PatientEmergencyContact.LastName
      }`,
      Emergency_Contact_Gender: data.PatientEmergencyContact.Gender.Type,
      Emergency_Contact_Relationship:
        data.PatientEmergencyContact.Relationship.RelationshipType,
      Emergency_Contact_Phonenumber: data.PatientEmergencyContact.PhoneNumber,
      PatientStatus: data.PatientStatus.Status,
      RegistrationDate: data.CreatedDate,
      CreatedBy:
        data.Accounts == null
          ? "No Account Info"
          : `${
              data.Accounts.FirstName +
              " " +
              data.Accounts.MiddleName +
              " " +
              data.Accounts.LastName
            }`,
    }));

    result = all.sort((a, b) => b.MRN - a.MRN);
  } else if (type == 4) {
    const name = await prisma.PatientList.findMany({
      where: {
        SoundX: {
          contains: searchName,
          mode: "insensitive",
        },
      },
      include: information,
    });

    const all = name.map((data) => ({
      MRN: data.id,
      PreviousMRN: data.PreviousMRN,
      Name: `${data.FirstName + " " + data.MiddleName + " " + data.LastName}`,
      DateOfBirth: data.DateOfBirth,
      PhoneNumber: data.PhoneNumber,
      Email: data.Email,
      Postal: data.Postal,
      Gender: data.Gender.Type,
      MaritalStatus: data.MaritalStatus.Status,
      Occupation: data.Occupations.Occupation_List,
      Country: data.Country.Name,
      Region: data.Region.RegionName,
      SubCity: data.SubCity.FullName,
      Woreda: data.Woreda.WoredaName,
      Zone: data.Zone.ZoneName,
      Kebele: data.Kebele,
      Emergency_Contact: `${
        data.PatientEmergencyContact.FirstName +
        " " +
        data.PatientEmergencyContact.MiddleName +
        " " +
        data.PatientEmergencyContact.LastName
      }`,
      Emergency_Contact_Gender: data.PatientEmergencyContact.Gender.Type,
      Emergency_Contact_Relationship:
        data.PatientEmergencyContact.Relationship.RelationshipType,
      Emergency_Contact_Phonenumber: data.PatientEmergencyContact.PhoneNumber,
      PatientStatus: data.PatientStatus.Status,
      RegistrationDate: data.CreatedDate,
      CreatedBy:
        data.Accounts == null
          ? "No Account Info"
          : `${
              data.Accounts.FirstName +
              " " +
              data.Accounts.MiddleName +
              " " +
              data.Accounts.LastName
            }`,
    }));

    result = all.sort((a, b) => b.MRN - a.MRN);
  }
  res.json(result);
};

export { searchPatient };

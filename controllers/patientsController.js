import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import moment from "moment";

const createPatient = async (req, res) => {
  const {
    PreviousMRN,
    FirstName,
    MiddleName,
    LastName,
    DateOfBirth,
    PhoneNumber,
    Email,
    Postal,
    GenderId,
    MaritalStatusId,
    OccupationId,
    CountryId,
    RegionId,
    SubCityId,
    WoredaName,
    ZoneId,
    Kebele,
    HouseNumber,
    PatientStatusId,
    EmergencyFirstName,
    EmergencyMiddleName,
    EmergencyLastName,
    EmergencyGenderId,
    EmergencyRelationshipId,
    EmergencyPhoneNumber,
    IsActive,
  } = req.body;
  let emergencyId;
  
  const woreda = await prisma.Woreda.create({
    data: {
      WoredaName,
      SubCityId,
    },
  });
  
  if (EmergencyFirstName !== undefined) {
    const emergency = await prisma.PatientEmergencyContact.create({
      data: {
        FirstName: EmergencyFirstName,
        MiddleName: EmergencyMiddleName,
        LastName: EmergencyLastName,
        GenderId: EmergencyGenderId,
        RelationshipId: EmergencyRelationshipId,
        PhoneNumber: EmergencyPhoneNumber,
      },
    });
    emergencyId = emergency.id;
  } else {
    emergencyId;
  }
  
  const data = await prisma.PatientList.create({
    data: {
      PreviousMRN,
      FirstName,
      MiddleName,
      LastName,
      SoundX:FirstName+MiddleName+LastName,
      DateOfBirth,
      PhoneNumber,
      Email,
      Postal,
      GenderId,
      MaritalStatusId,
      OccupationId,
      CountryId,
      RegionId,
      SubCityId,
      WoredaId: woreda.id,
      ZoneId,
      Kebele,
      HouseNumber,
      PatientEmergencyContactId: emergencyId,
      PatientStatusId,
      CreatedBy:req.user.userId,
      IsActive,
    },
  });
  
  res.json(data);
};

const getAllPatients = async (req, res) => {
  const data = await prisma.PatientList.findMany({
    take: -45,
    include: {
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
      Region:{
        select:{
          RegionName: true,
        }
      },
      SubCity:{
        select:{
          FullName : true,
        }
      },
      Zone:{
        select:{
          ZoneName:true,
        }
      },
      PatientEmergencyContact:{
        select:{
          FirstName:true,
          MiddleName:true,
          LastName:true,
          Gender:{
            select:{
              Type:true,
            }
          },
          Relationship:{
            select:{
              RelationshipType:true
            }
          },
          PhoneNumber:true,
        }
      },
      PatientStatus:{
        select:{
          Status:true,
        }
      },
      Accounts:{
        select:{
          FirstName:true,
          MiddleName:true,
          LastName:true,
        }
      }
    },

  });

  const all = data.map(data => ({
    MRN: data.id,
    PreviousMRN: data.PreviousMRN,
    Name: `${data.FirstName+" "+data.MiddleName+" "+data.LastName}`,
    DateOfBirth: `${data.DateOfBirth + " yr(s)"}`,
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
    HouseNumber:data.HouseNumber,
    Emergency_Contact: `${data.PatientEmergencyContact.FirstName + " " +data.PatientEmergencyContact.MiddleName+ " "+data.PatientEmergencyContact.LastName}`,
    Emergency_Contact_Gender: data.PatientEmergencyContact.Gender.Type,
    Emergency_Contact_Relationship:data.PatientEmergencyContact.Relationship.RelationshipType,
    Emergency_Contact_Phonenumber: data.PatientEmergencyContact.PhoneNumber,
    PatientStatus: data.PatientStatus.Status,
    RegistrationDate: moment(data.CreatedDate).format(
      "MMM Do, YYYY, h:mm:ss a"
    ),
    CreatedBy: data.Accounts == null ? "No Account Info": `${data.Accounts.FirstName+ " "+data.Accounts.MiddleName+" "+data.Accounts.LastName}` ,
  }),)
  const reverse = all.reverse();
  res.json(reverse);
};

const getPatient = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PatientList.findUnique({
    where: {
      id: Number(id),
    },

    include: {
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
      Region:{
        select:{
          RegionName: true,
        }
      },
      SubCity:{
        select:{
          FullName : true,
        }
      },
      Zone:{
        select:{
          ZoneName:true,
        }
      },
      PatientEmergencyContact:{
        select:{
          FirstName:true,
          MiddleName:true,
          LastName:true,
          Gender:{
            select:{
              Type:true,
            }
          },
          Relationship:{
            select:{
              RelationshipType:true
            }
          },
          PhoneNumber:true,
        }
      },
      PatientStatus:{
        select:{
          Status:true,
        }
      },
      Accounts:{
        select:{
          FirstName:true,
          MiddleName:true,
          LastName:true,
        }
      }
    },
  });
  res.json(
    {
      MRN:data.id,
      PreviousMRN: data.PreviousMRN,
      Name: `${data.FirstName+" "+data.MiddleName+" "+data.LastName}`,
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
      Emergency_Contact: `${data.PatientEmergencyContact.FirstName + " " +data.PatientEmergencyContact.MiddleName+ " "+data.PatientEmergencyContact.LastName}`,
      Emergency_Contact_Gender: data.PatientEmergencyContact.Gender.Type,
      Emergency_Contact_Relationship:data.PatientEmergencyContact.Relationship.RelationshipType,
      Emergency_Contact_Phonenumber: data.PatientEmergencyContact.PhoneNumber,
      PatientStatus: data.PatientStatus.Status,
      RegistrationDate: data.CreatedDate,
      CreatedBy: `${data.Accounts.FirstName + " "+data.Accounts.MiddleName+" "+data.Accounts.LastName}`,
    },
  );
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const {
    PreviousMRN,
    FirstName,
    MiddleName,
    LastName,
    DateOfBirth,
    PhoneNumber,
    Email,
    Postal,
    GenderId,
    MaritalStatusId,
    OccupationId,
    CountryId,
    RegionId,
    SubCityId,
    WoredaId,
    WoredaName,
    ZoneId,
    Kebele,
    HouseNumber,
    PatientStatusId,
    PatientEmergencyContactId,
    EmergencyFirstName,
    EmergencyMiddleName,
    EmergencyLastName,
    EmergencyGenderId,
    EmergencyRelationshipId,
    EmergencyPhoneNumber,
    CreatedBy,
    IsActive,
  } = req.body;

  const woreda = await prisma.Woreda.update({
    where: { id: Number(WoredaId) },
    data: {
      WoredaName,
      SubCityId,
      CreatedBy,
    },
  });

  const emergency = await prisma.PatientEmergencyContact.update({
    where: { id: Number(PatientEmergencyContactId) },
    data: {
      FirstName: EmergencyFirstName,
      MiddleName: EmergencyMiddleName,
      LastName: EmergencyLastName,
      GenderId: EmergencyGenderId,
      RelationshipId: EmergencyRelationshipId,
      PhoneNumber: EmergencyPhoneNumber,
      CreatedBy: CreatedBy,
    },
  });

  const data = await prisma.PatientList.update({
    where: { id: Number(id) },
    data: {
      PreviousMRN,
      FirstName,
      MiddleName,
      LastName,
      DateOfBirth,
      PhoneNumber,
      Email,
      Postal,
      GenderId,
      MaritalStatusId,
      OccupationId,
      CountryId,
      RegionId,
      SubCityId,
      WoredaId,
      ZoneId,
      Kebele,
      HouseNumber,
      PatientStatusId,
      CreatedBy,
      IsActive,
    },
  });
  res.json(data, emergency, woreda);
};

const deletePatient = async (req, res) => {
  const { id } = req.params;

  // const data = await prisma.Patient.delete({
  //   where: {
  //     id: Number(id),
  //   },
  // });

  // res.json(data);
};

export {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatient,
  updatePatient,
};

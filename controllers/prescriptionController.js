import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import moment from "moment";

const createPrescription = async (req, res) => {
  const {
    PatientId,
    Medication,
    Strength,
    AmountToBeTaken,
    Frequency,
    Route,
    HowMuch,
    Refills,
    Note,
    Clinic,
    IsActive,
  } = req.body;

  const data = await prisma.PatientPrescription.create({
    data: {
      PatientId,
      Medication,
      Strength,
      AmountToBeTaken,
      Frequency,
      Route,
      HowMuch,
      Refills,
      Note,
      Clinic,
      CreatedBy:req.user.userId,
      IsActive,
    },
  });

  res.json(data);
};

const getAllPrescription = async (req, res) => {
  const data = await prisma.PatientPrescription.findMany({});

  res.json(data);
};

const getPrescription = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PatientPrescription.findMany({
    where: {
      PatientId: Number(id),
    },
    include: {
      Accounts: {
        select: {
          FirstName: true,
          MiddleName: true,
          LastName: true,
        },
      },
      ClinicList: {
        select: {
          ClinicName: true,
        },
      },
    },
  });

  const all = data.map((data) => ({
    PatientId: data.PatientId,
    Medication: data.Medication,
    Strength: data.Strength,
    AmountToBeTaken: data.AmountToBeTaken,
    Frequency: data.Frequency,
    Route: data.Route,
    HowMuch: data.HowMuch,
    Refills: data.Refills,
    Note: data.Note,
    Clinic: data.ClinicList != undefined ? data.ClinicList.ClinicName : "",
    CreatedDate: moment(data.CreatedDate).format("MMM Do, YYYY, h:mm a"),
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
  const reverse = all.reverse();
  res.json(reverse);
};

const updatePrescription = async (req, res) => {
  const { id } = req.params;
  const {
    Medication,
    Strength,
    AmountToBeTaken,
    Frequency,
    Route,
    HowMuch,
    Refills,
    Note,
    IsActive,
  } = req.body;

  const data = await prisma.PatientPrescription.update({
    where: { id: Number(id) },
    data: {
      Medication,
      Strength,
      AmountToBeTaken,
      Frequency,
      Route,
      HowMuch,
      Refills,
      Note,
      IsActive,
    },
  });
  res.json(data);
};

const deletePrescription = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.PatientPrescription.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createPrescription,
  deletePrescription,
  getAllPrescription,
  getPrescription,
  updatePrescription,
};

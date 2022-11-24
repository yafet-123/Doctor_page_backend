import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import moment from "moment";

const createSickLeave = async (req, res) => {
  const {
    PatientId,
    Diagnosis,
    Recommendation,
    TotalLeaveDays,
    Clinic,
    IsActive,
  } = req.body;

  const data = await prisma.SickLeave.create({
    data: {
      PatientId,
      Diagnosis,
      Recommendation,
      TotalLeaveDays,
      Clinic,
      CreatedBy: req.user.userId,
      IsActive,
    },
  });

  res.json(data);
};

const getAllSickLeave = async (req, res) => {
  const data = await prisma.SickLeave.findMany({});

  res.json(data);
};

const getSickLeave = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.SickLeave.findMany({
    where: {
      PatientId: Number(id),
    },
    include: {
      ClinicList: {
        select: {
          ClinicName: true,
        },
      },
      ClinicList: {
        select: {
          ClinicName: true,
        },
      },
      Accounts: {
        select: {
          FirstName: true,
          MiddleName: true,
          LastName: true,
        },
      },
    },
  });

  const all = data.map((data) => ({
    PatientId: data.PatientId,
    Recommendation:data.Recommendation,
    TotalLeaveDays:data.TotalLeaveDays,
    Diagnosis:data.Diagnosis,
    Clinic: data.ClinicList != undefined ? data.ClinicList.ClinicName : "",
    CreatedDate:moment(data.CreatedDate).format(
      "MMM Do, YYYY, h:mm a"
    ),
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

const updateSickLeave = async (req, res) => {
  const { id } = req.params;
  const { PatientId, DiagnosisId, Recommendation, TotalLeaveDays, IsActive } =
    req.body;

  const data = await prisma.SickLeave.update({
    where: { id: Number(id) },
    data: {
      PatientId,
      DiagnosisId,
      Recommendation,
      TotalLeaveDays,
      IsActive,
    },
  });
  res.json(data);
};

const deleteSickLeave = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.SickLeave.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createSickLeave,
  deleteSickLeave,
  getAllSickLeave,
  getSickLeave,
  updateSickLeave,
};

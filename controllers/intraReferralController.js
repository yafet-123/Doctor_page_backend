import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import moment from "moment";

const createIntraReferral = async (req, res) => {
  const { PatientId, Clinic, ClinicReferTo, Note, IsActive } =
    req.body;

  const data = await prisma.IntraReferral.create({
    data: {
      PatientId,
      Clinic,
      ClinicReferTo,
      Note,
      CreatedBy:req.user.userId,
      IsActive,
    },
  });

  res.json(data);
};

const getAllIntraReferral = async (req, res) => {
  const data = await prisma.IntraReferral.findMany({});

  res.json(data);
};

const getIntraReferral = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.IntraReferral.findMany({
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
      ClinicList_ClinicListToIntraReferral_Clinic: {
        select: {
          ClinicName: true,
        },
      },
      ClinicList_ClinicListToIntraReferral_ClinicReferTo: {
        select: {
          ClinicName: true,
        },
      },
    },
  });

  const all = data.map((data) => ({
    PatientId: data.PatientId,
    Note: data.Note,
    Clinic: data.ClinicList_ClinicListToIntraReferral_Clinic != undefined ? data.ClinicList_ClinicListToIntraReferral_Clinic.ClinicName : "",
    ClinicReferedTo: data.ClinicList_ClinicListToIntraReferral_ClinicReferTo != undefined ? data.ClinicList_ClinicListToIntraReferral_ClinicReferTo.ClinicName : "",
    CreatedDate: moment(data.CreatedDate).format("MMM Do, YYYY, h:mm:ss a"),
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

const updateIntraReferral = async (req, res) => {
  const { id } = req.params;
  const { PatientId, ClinicId, ClinicReferTo, Note, IsActive } = req.body;

  const data = await prisma.IntraReferral.update({
    where: { id: Number(id) },
    data: {
      PatientId,
      ClinicId,
      ClinicReferTo,
      Note,
      IsActive,
    },
  });
  res.json(data);
};

const deleteIntraReferral = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.IntraReferral.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createIntraReferral,
  deleteIntraReferral,
  getAllIntraReferral,
  getIntraReferral,
  updateIntraReferral,
};

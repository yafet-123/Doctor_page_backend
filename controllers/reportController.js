import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getReport = async (req, res) => {
  const { id } = req.params;

  const countPrescription = await prisma.PatientPrescription.count({
    where: {
      PatientId: Number(id),
    },
    select: {
      _all: true,
    },
  });

  const countSickLeave = await prisma.SickLeave.count({
    where: {
      PatientId: Number(id),
    },
    select: {
      _all: true,
    },
  });

  const countOrderedImaging = await prisma.OrderedImageRequestInfo.count({
    where: {
      PatientId: Number(id),
    },
    select: {
      _all: true,
    },
  });

  const countLabTest = await prisma.OrderedLabPanelInfo.count({
    where: {
      PatientId: Number(id),
    },
    select: {
      _all: true,
    },
  });

  const countIntraReferral = await prisma.IntraReferral.count({
    where: {
      PatientId: Number(id),
    },
    select: {
      _all: true,
    },
  });

  const countDoc_Dashboard = await prisma.Doc_Dashboard.count({
    where: {
      PatientId: Number(id),
    },
    select: {
      _all: true,
    },
  });

  res.json({
    labels: [
      "Prescription",
      "Sick Leave",
      "Ordered Imaging",
      "Ordered Lab Test",
      "IntraReferral",
    ],
    dataUnit: "People",
    legend: false,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["#8ECAE6", "#219EBC", "#817425", "#FFB703","#FB8500"],
        data: [
          countPrescription._all,
          countSickLeave._all,
          countOrderedImaging._all,
          countLabTest._all,
          countIntraReferral._all,
        ],
      },
    ],
  });
};

const getPatientCountReport = async (req, res) => {

  const countMalePatient = await prisma.PatientList.count({
    where: {
      GenderId: 1,
    },
    select: {
      _all: true,
    },
  });

  const countFemalePatient = await prisma.PatientList.count({
    where: {
      GenderId: 2,
    },
    select: {
      _all: true,
    },
  });
  const Count = {
    Male:countMalePatient._all,
    Female:countFemalePatient._all,
    All:countMalePatient._all + countFemalePatient._all,
  }

  res.json(Count);
}

export { getReport,getPatientCountReport };

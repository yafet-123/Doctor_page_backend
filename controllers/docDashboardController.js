import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import moment from "moment";

const prisma = new PrismaClient();

const createDocDashboard = async (req, res) => {
  const {
    PatientId,
    // History
    HistoryNote,
    // Vitalsign
    Blood_Pressure_BP_,
    Pulse_Rate_PR_,
    Respiration_Rate_RR_,
    Saturation_of_Oxygen_in_the_Blood_SPO2_,
    Body_Temperature_BT_,
    // Physical examination
    GeneralAppearance,
    HEENT,
    RespiratorySystem,
    CVS,
    Abdomen,
    GUS,
    MSS,
    Integumentary,
    CNS,
    Obstetrics,
    Gynecological,
    Neonatal,
    LGS,
    Weight,
    Height,
    // Diagnosis
    Diagnosis,
    Code,
    // Progress
    Progress,
    // Management
    Management,
    clinic,
  } = req.body;

  let historyId,
    vitalsignId,
    physicalExaminationId,
    diagnosisId,
    progressId,
    managementId;

  if (HistoryNote !== "") {
    const history = await prisma.PatientHistory.create({
      data: {
        HistoryNote,
        CreatedBy: req.user.userId,
        IsActive: true,
      },
    });
    historyId = history.id;
  } else {
    historyId;
  }

  if (
    (Blood_Pressure_BP_ ||
      Pulse_Rate_PR_ ||
      Respiration_Rate_RR_ ||
      Saturation_of_Oxygen_in_the_Blood_SPO2_ ||
      Body_Temperature_BT_) !== ""
  ) {
    const vitalsign = await prisma.VitalSigns.create({
      data: {
        Blood_Pressure_BP_,
        Pulse_Rate_PR_,
        Respiration_Rate_RR_,
        Saturation_of_Oxygen_in_the_Blood_SPO2_,
        Body_Temperature_BT_,
        CreatedBy: req.user.userId,
        IsActive: true,
      },
    });
    vitalsignId = vitalsign.id;
  } else {
    vitalsignId;
  }

  if (
    (GeneralAppearance ||
      HEENT ||
      RespiratorySystem ||
      CVS ||
      Abdomen ||
      GUS ||
      MSS ||
      Integumentary ||
      CNS ||
      Obstetrics ||
      Gynecological ||
      Neonatal ||
      LGS ||
      Weight ||
      Height) !== ""
  ) {
    const physicalExamination = await prisma.PhysicalExamination.create({
      data: {
        GeneralAppearance,
        HEENT,
        RespiratorySystem,
        CVS,
        Abdomen,
        GUS,
        MSS,
        Integumentary,
        CNS,
        Obstetrics,
        Gynecological,
        Neonatal,
        LGS,
        Weight,
        Height,
        CreatedBy: req.user.userId,
        IsActive: true,
      },
    });
    physicalExaminationId = physicalExamination.id;
  } else {
    physicalExaminationId;
  }

  if (Diagnosis !== "") {
    const diagnosis = await prisma.DiagnosisList.create({
      data: {
        Diagnosis,
        Code,
        CreatedBy: req.user.userId,
        IsActive: true,
      },
    });
    diagnosisId = diagnosis.id;
  } else {
    diagnosisId;
  }

  if (Progress !== "") {
    const progress = await prisma.PatientProgress.create({
      data: {
        Progress,
        CreatedBy: req.user.userId,
        IsActive: true,
      },
    });
    progressId = progress.id;
  } else {
    progressId;
  }

  if (Management !== "") {
    const management = await prisma.PatientManagement.create({
      data: {
        Management,
        CreatedBy: req.user.userId,
        IsActive: true,
      },
    });
    managementId = management.id;
  } else {
    managementId;
  }

  const data = await prisma.Doc_Dashboard.create({
    data: {
      PatientId:parseInt(PatientId),
      HistoryId: historyId,
      VitalSignsId: vitalsignId,
      PhysicalExaminationsId: physicalExaminationId,
      DiagnosisId: diagnosisId,
      ProgressId: progressId,
      ManagementId: managementId,
      clinic,
      CreatedBy: req.user.userId,
      IsActive: true,
    },
  });

  res.json(data);
};

const getAllDocDashboard = async (req, res) => {
  const data = await prisma.Doc_Dashboard.findMany({});

  res.json(data);
};

const getDocDashboard = async (req, res) => {
  const { id } = req.params;
  const patient = await prisma.PatientList.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      Gender: {
        select: {
          Type: true,
        },
      },
      Occupations: {
        select: {
          Occupation_List: true,
        },
      },
    },
  });

  const data = await prisma.Doc_Dashboard.findMany({
    where: {
      PatientId: Number(id),
    },
    orderBy: {
      id: "desc",
    },

    include: {
      PatientHistory: {
        select: {
          HistoryNote: true,
        },
      },
      VitalSigns: {
        select: {
          Blood_Pressure_BP_: true,
          Pulse_Rate_PR_: true,
          Respiration_Rate_RR_: true,
          Saturation_of_Oxygen_in_the_Blood_SPO2_: true,
          Body_Temperature_BT_: true,
        },
      },
      PhysicalExamination: {
        select: {
          GeneralAppearance: true,
          HEENT: true,
          RespiratorySystem: true,
          CVS: true,
          Abdomen: true,
          GUS: true,
          MSS: true,
          Integumentary: true,
          CNS: true,
          Obstetrics: true,
          Gynecological: true,
          Neonatal: true,
          LGS: true,
          Weight: true,
          Height: true,
        },
      },
      DiagnosisList: {
        select: {
          Diagnosis: true,
        },
      },
      PatientProgress: {
        select: {
          Progress: true,
        },
      },
      PatientManagement: {
        select: {
          Management: true,
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
  const info = {
    //Patient info
    MRN: patient.id,
    Name: `${
      patient.FirstName + " " + patient.MiddleName + " " + patient.LastName
    }`,
    DateOfBirth: patient.DateOfBirth,
    PhoneNumber: patient.PhoneNumber,
    Gender: patient.Gender.Type,
    Occupation: patient.Occupations.Occupation_List,
  };
  const all = data.map((data) => ({
    //patient History

    History:
      data.PatientHistory != undefined ? data.PatientHistory.HistoryNote : "",
    //Vital sign
    VitalSign: {
      BP:
        data.VitalSigns != undefined ? data.VitalSigns.Blood_Pressure_BP_ : "",
      PR: data.VitalSigns != undefined ? data.VitalSigns.Pulse_Rate_PR_ : "",
      RR:
        data.VitalSigns != undefined
          ? data.VitalSigns.Respiration_Rate_RR_
          : "",
      SPO2:
        data.VitalSigns != undefined
          ? data.VitalSigns.Saturation_of_Oxygen_in_the_Blood_SPO2_
          : "",
      BT:
        data.VitalSigns != undefined
          ? data.VitalSigns.Body_Temperature_BT_
          : "",
    },
    //Physical Examination
    PhysicalExamination: {
      GeneralAppearance:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.GeneralAppearance
          : "",
      HEENT:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.HEENT
          : "",
          RespiratorySystem:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.RespiratorySystem
          : "",
      CVS:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.CVS
          : "",
      Abdomen:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Abdomen
          : "",
      GUS:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.GUS
          : "",
      MSS:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.MSS
          : "",
      Integumentary:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Integumentary
          : "",
      CNS:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.CNS
          : "",
      Obstetrics:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Obstetrics
          : "",
      Gynecological:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Gynecological
          : "",
      Neonatal:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Neonatal
          : "",
      LGS:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.LGS
          : "",
      Weight:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Weight
          : "",
      Height:
        data.PhysicalExamination != undefined
          ? data.PhysicalExamination.Height
          : "",
    },
    //Diagnosis
    Diagnosis:
      data.DiagnosisList != undefined ? data.DiagnosisList.Diagnosis : "",
    //Patient Progress
    Progress:
      data.PatientProgress != undefined ? data.PatientProgress.Progress : "",
    //Patient Management
    Management:
      data.PatientManagement != undefined
        ? data.PatientManagement.Management
        : "",
    //Clinic
    Clinic: data.ClinicList != undefined ? data.ClinicList.ClinicName : "",
    //creatore
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
    CreatedDate: moment(data.CreatedDate).format(
      "MMM Do, YYYY, h:mm a"
    ),
  }));
  // const all = detaile.reverse();
  res.json({ info, all });
};

const updateDocDashboard = async (req, res) => {
  const { id } = req.params;
  const { Name, Symbols, IsActive } = req.body;

  const data = await prisma.Doc_Dashboard.update({
    where: { id: Number(id) },
    data: {
      Name,
      Symbols,
      IsActive,
    },
  });
  res.json(data);
};

const deleteDocDashboard = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.Doc_Dashboard.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createDocDashboard,
  deleteDocDashboard,
  getAllDocDashboard,
  getDocDashboard,
  updateDocDashboard,
};

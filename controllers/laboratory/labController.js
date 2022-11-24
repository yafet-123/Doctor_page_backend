import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllPendinglabRequest = async (req, res) => {
  const { id } = req.params;

  const labinfo = await prisma.OrderedLabPanelInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });
  let data = [];
  for (let i = 0; i < labinfo.length; i++) {
    const tdata = await prisma.OrderedLabPanel.findMany({
      where: {
        InfoId: labinfo[i].id,
        IsActive: {
          equals: null,
        },
        LabTransferStatus: {
          is: {
            isTransfered: false,
          },
        },
        PaymentStatus: {
          is: {
            isPayed: false,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
      include: {
        LabPanels: {
          select: {
            panelsAbbreviation: true,
          },
        },
        LabTransferStatus: {
          select: {
            isTransfered: true,
          },
        },
        PaymentStatus: {
          select: {
            isPayed: true,
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

    const tdatas = tdata.map((data) => ({
      id: data.id,
      InfoId: data.InfoId,
      Panel: data.LabPanels.panelsAbbreviation,
      TransferLabId: data.TransferLabId,
      CreatedDate: data.CreatedDate,
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
      IsActive: data.IsActive,
      Clinic: data.ClinicList.ClinicName,
    }));
    if (tdatas.length !== 0) {
      data.push(tdatas);
    }
  }

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

  const info = {
    //Patient info
    MRN: patient.id,
    Name: `${
      patient.FirstName + " " + patient.MiddleName + " " + patient.LastName
    }`,
    DateOfBirth: patient.DateOfBirth,
    Gender: patient.Gender.Type,
    Phonenumber: patient.PhoneNumber,
    Occupation: patient.Occupations.Occupation_List,
  };


  res.json({ all: data, info: info });
};

const TransferOrderLabRequest = async (req, res) => {
  const { RequestId, InfoId } = req.body;

  const data = await prisma.OrderedLabPanel.updateMany({
    where: { InfoId: InfoId },

    data: {
      IsActive: false,
    },
  });

  for (let i = 0; i < RequestId.length; i++) {
    const data = await prisma.OrderedLabPanel.update({
      where: { id: Number(RequestId[i]) },

      data: {
        IsActive: true,
        LabTransferStatus: {
          update: {
            isTransfered: true,
            TransferredBy: req.user.userId,
            IsActive: true,
          },
        },
      },
    });
    res.json("data");
  }
};

const getAllPendingPaymentLabRequest = async (req, res) => {
  const { id } = req.params;
  const labinfo = await prisma.OrderedLabPanelInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });

  const data = await prisma.OrderedLabPanel.findMany({
    where: {
      InfoId: labinfo.id,
      LabTransferStatus: {
        is: {
          isTransfered: true,
        },
      },
      PaymentStatus: {
        is: {
          isPayed: false,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    include: {
      LabPanels: {
        select: {
          panelsAbbreviation: true,
        },
      },
      LabTransferStatus: {
        select: {
          isTransfered: true,
        },
      },
      PaymentStatus: {
        select: {
          isPayed: true,
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

  const info = {
    //Patient info
    MRN: patient.id,
    Name: `${
      patient.FirstName + " " + patient.MiddleName + " " + patient.LastName
    }`,
    DateOfBirth: patient.DateOfBirth,
    Gender: patient.Gender.Type,
    Phonenumber: patient.PhoneNumber,
    Occupation: patient.Occupations.Occupation_List,
  };

  const all = data.map((data) => ({
    id: data.InfoId,
    Panel: data.id,
    PanelsAbbreviation: data.LabPanels.panelsAbbreviation,
    Clinic: data.ClinicList.ClinicName,
    Requested_Date: data.CreatedDate,
    CreatedBy: `${
      data.Accounts.FirstName +
      " " +
      data.Accounts.MiddleName +
      " " +
      data.Accounts.LastName
    }`,
  }));

  res.json({ all: all, info: info });
};

const TransferBackLabRequest = async (req, res) => {
  const { id } = req.params;
  const { isTransfered, isAvailable } = req.body;

  const data = await prisma.OrderedLabPanel.update({
    where: { id: Number(id) },

    data: {
      LabTransferStatus: {
        update: {
          isTransfered: isTransfered,
          TransferredBy: req.user.userId,
          IsActive: isAvailable,
        },
      },
    },
  });
  res.json(data);
};

const getAllPendingResultLabRequest = async (req, res) => {
  const { id } = req.params;

  const labinfo = await prisma.OrderedLabPanelInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });

  let data = [];
  for (let i = 0; i < labinfo.length; i++) {

  const tdata = await prisma.OrderedLabPanel.findMany({
    where: {
      InfoId: labinfo[i].id,
      LabTransferStatus: {
        is: {
          isTransfered: true,
        },
      },
      PaymentStatus: {
        is: {
          isPayed: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    include: {
      LabPanels: {
        select: {
          panelsAbbreviation: true,
        },
      },
      LabTransferStatus: {
        select: {
          isTransfered: true,
        },
      },
      PaymentStatus: {
        select: {
          isPayed: true,
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

  const tdatas = tdata.map((data) => ({
      id: data.id,
      InfoId: data.InfoId,
      Panel: data.LabPanels.panelsAbbreviation,
      TransferLabId: data.TransferLabId,
      CreatedDate: data.CreatedDate,
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
      IsActive: data.IsActive,
      Clinic: data.ClinicList.ClinicName,
    }));
    if (tdatas.length !== 0) {
      data.push(tdatas);
    }
}

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

  const info = {
    //Patient info
    MRN: patient.id,
    Name: `${
      patient.FirstName + " " + patient.MiddleName + " " + patient.LastName
    }`,
    DateOfBirth: patient.DateOfBirth,
    Gender: patient.Gender.Type,
    Phonenumber: patient.PhoneNumber,
    Occupation: patient.Occupations.Occupation_List,
  };



  res.json({ all: data, info: info });
};

const AddLabResult = async (req, res) => {
  const { id } = req.params;
  const { Result } = req.body;

  const data = await prisma.OrderedLabPanel.update({
    where: { id: Number(id) },

    data: {
      RadRequestResult: {
        update: {
          Result: Result,
          IsActive: true,
          ModifiedDate: new Date(),
          CreatedBy: req.user.userId,
        },
      },
    },
  });
  res.json(data);
};

const ResultLabRequest = async (req, res) => {
  const { id } = req.params;

  const radinfo = await prisma.OrderedImageRequestInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });

  const data = await prisma.OrderedImagRequest.findMany({
    where: {
      InfoId: radinfo.id,
      RadTransferStatus: {
        is: {
          isTransfered: true,
        },
      },
      RadRequestResult: {
        is: {
          IsActive: true,
        },
      },
      PaymentStatus: {
        is: {
          isPayed: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    include: {
      RadRequest: {
        select: {
          RequestName: true,
        },
      },
      RadRequestResult: {
        select: {
          Result: true,
        },
      },
      RadTransferStatus: {
        select: {
          isTransfered: true,
        },
      },
      PaymentStatus: {
        select: {
          isPayed: true,
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

  const info = {
    //Patient info
    MRN: patient.id,
    Name: `${
      patient.FirstName + " " + patient.MiddleName + " " + patient.LastName
    }`,
    DateOfBirth: patient.DateOfBirth,
    Gender: patient.Gender.Type,
    Phonenumber: patient.PhoneNumber,
    Occupation: patient.Occupations.Occupation_List,
  };

  const all = data.map((data) => ({
    PatientId: data.PatientId,
    Requestid: data.id,
    Request: data.RadRequest.RequestName,
    Result: data.RadRequestResult.Result,
    Clinic: data.ClinicList.ClinicName,
    Requested_Date: data.CreatedDate,
    CreatedBy: `${
      data.Accounts.FirstName +
      " " +
      data.Accounts.MiddleName +
      " " +
      data.Accounts.LastName
    }`,
  }));

  res.json({ all: all, info: info });
};

export {
  getAllPendinglabRequest,
  TransferOrderLabRequest,
  getAllPendingPaymentLabRequest,
  TransferBackLabRequest,
  getAllPendingResultLabRequest,
  AddLabResult,
  ResultLabRequest,
};

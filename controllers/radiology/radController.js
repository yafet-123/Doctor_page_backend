import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllPendingRadRequest = async (req, res) => {
  const { id } = req.params;

  const radinfo = await prisma.OrderedImageRequestInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });

  const data = await prisma.OrderedImagRequest.findMany({
    where: {
      InfoId: radinfo.id,
      IsActive: {
        equals: null,
      },
      RadTransferStatus: {
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
      RadRequest: {
        select: {
          RequestName: true,
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
    id: data.InfoId,
    Requestid: data.id,
    Request: data.RadRequest.RequestName,
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

const TransferOrderRadRequest = async (req, res) => {
  const { id, RequestId, isTransfered, isAvailable } = req.body;

  const data = await prisma.OrderedImagRequest.updateMany({
    where: { InfoId: Number(id) },

    data: {
          IsActive: false,
        },
  });

  for (let i = 0; i < RequestId.length; i++) {
    const data = await prisma.OrderedImagRequest.update({
      where: { id: Number(RequestId[i]) },

      data: {
        IsActive:true,
        RadTransferStatus: {
          update: {
            isTransfered: isTransfered,
            TransferredBy: req.user.userId,
            IsActive: isAvailable,
          },
        },
      },
    });
    res.json("data");
  }
};

const getAllPendingPaymentRadRequest = async (req, res) => {
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
      RadRequest: {
        select: {
          RequestName: true,
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
    id: data.InfoId,
    Requestid: data.id,
    Request: data.RadRequest.RequestName,
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

const TransferBackRadRequest = async (req, res) => {
  const { id } = req.params;
  const { isTransfered } = req.body;

  const data = await prisma.OrderedImagRequest.update({
    where: { InfoId: Number(id) },

    data: {
      RadTransferStatus: {
        update: {
          isTransfered: isTransfered,
          TransferredBy: req.user.userId,
          IsActive: null,
        },
      },
    },
  });
  res.json(data);
};

const getAllPendingResultRadRequest = async (req, res) => {
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
          IsActive: false,
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
    id: data.id,
    Requestid: data.id,
    Request: data.RadRequest.RequestName,
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

const AddRadResult = async (req, res) => {
  const { id } = req.params;
  const { Result } = req.body;

  const data = await prisma.OrderedImagRequest.update({
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

const ResultRadRequest = async (req, res) => {
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
  getAllPendingRadRequest,
  TransferOrderRadRequest,
  getAllPendingPaymentRadRequest,
  TransferBackRadRequest,
  getAllPendingResultRadRequest,
  AddRadResult,
  ResultRadRequest,
};

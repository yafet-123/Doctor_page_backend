import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getAllTransfers = async (req, res) => {
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
        equals: true,
      },
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
          Price:true,
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
  };

  const all = data.map((data) => ({
    id: data.InfoId,
    Requestid: data.id,
    Request: data.RadRequest.RequestName,
    Price: data.RadRequest.Price,
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

  const labinfo = await prisma.OrderedLabPanelInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });
  const dataa = await prisma.OrderedLabPanel.findMany({
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
    include: {
      LabPanels: {
        select: {
          panelsAbbreviation: true,
          price: true,
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

  const alll = dataa.map((data) => ({
    id: data.InfoId,
    Requestid:data.id,
    Panel: data.LabPanels.panelsAbbreviation,
    Price: data.LabPanels.price,
    Requested_Date: data.CreatedDate,
    Clinic: data.ClinicList.ClinicName,
    CreatedBy: `${
      data.Accounts.FirstName +
      " " +
      data.Accounts.MiddleName +
      " " +
      data.Accounts.LastName
    }`,
  }));

  res.json({ rad: all,lab: alll, info: info });
};

const getAllPaid = async (req, res) => {
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
          isPayed: true,
        },
      },
    },
    include: {
      RadRequest: {
        select: {
          RequestName: true,
          Price:true,
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
          CreatedDate:true,
           Accounts: {
              select:{
                FirstName: true,
                MiddleName: true,
                LastName: true,
            },
          },
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
  };

  const all = data.map((data) => ({
    id: data.InfoId,
    Requestid: data.id,
    Request: data.RadRequest.RequestName,
    Price: data.RadRequest.Price,
    ApprovedBy: `${
      data.PaymentStatus.Accounts.FirstName +
      " " +
      data.PaymentStatus.Accounts.MiddleName +
      " " +
      data.PaymentStatus.Accounts.LastName
    }`,
    ApprovedDate: data.PaymentStatus.CreatedDate,
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

  const labinfo = await prisma.OrderedLabPanelInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  });

  const dataa = await prisma.OrderedLabPanel.findMany({
    where: {
      InfoId: labinfo.id,
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
    include: {
      LabPanels: {
        select: {
          PanelsAbbreviation: true,
          Price: true,
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
      Accounts: {
        select: {
          FirstName: true,
          MiddleName: true,
          LastName: true,
        },
      },
    },
  });

  const alll = dataa.map((data) => ({
    PatientId: data.PatientId,
    DateOfBirth: data.PatientList.DateOfBirth,
    Gender: data.PatientList.Gender.Type,
    Panel: data.LabPanels.PanelsAbbreviation,
    Panel_Price: `${data.LabPanels.Price + " Birr"}`,
    Requested_Date: data.CreatedDate,
    CreatedBy: `${
      data.Accounts.FirstName +
      " " +
      data.Accounts.MiddleName +
      " " +
      data.Accounts.LastName
    }`,
  }));

  res.json({ rad: all,lab: alll, info: info });
};

const PayedCasher = async (req, res) => {

  const { RequestId,type } = req.body;
  for (let i = 0; i < RequestId.length; i++) {
    if(type === "Rad"){
  const data = await prisma.OrderedImagRequest.update({
    where: { id: Number(RequestId[i]) },

    data: {
      PaymentStatus: {
        update: {
          isPayed: true,
          ApprovedBy: req.user.userId,
        },
      },
    },
  });
}
else if(type==="Lab") {
  const data = await prisma.OrderedLabPanel.update({
    where: { id: Number(RequestId[i]) },

    data: {
      PaymentStatus: {
        update: {
          isPayed: true,
          ApprovedBy: req.user.userId,
        },
      },
    },
  });
}

}
  res.json("updated");
};

export { getAllTransfers, PayedCasher,getAllPaid };

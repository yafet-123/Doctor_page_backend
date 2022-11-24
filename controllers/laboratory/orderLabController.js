import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import moment from "moment"

const createOrderLab = async (req, res) => {
  const { PatientId, PanelId, Clinic, IsActive } = req.body;

  let status = {
    isPayed: false,
    isTransfered: false,
    Remark: "Some Remark",
    Type: 1,
  };

  const info = await prisma.OrderedLabPanelInfo.create({
    data: {
      PatientId,
      AdditionalInformation: status.Remark,
      Clinic: Clinic,
      CreatedBy: req.user.userId,
    },
  });

  for (let i = 0; i < PanelId.length; i++) {
    const payment = await prisma.PaymentStatus.create({
      data: {
        isPayed: status.isPayed,
        Remark: status.Remark,
        Type: status.Type,
      },
    });

    const test = await prisma.labPanelTest.findMany({
      where: {
        panelId: PanelId[i],
      },
    });
    for (let j = 0; j < test.length; j++) {
      console.log(PanelId[i])
      const result = await prisma.LabTestResult.create({
        data: {
          infoId: info.id,
          orderedPanelId: PanelId[i],
          testId: test[j].testId,
        },
      });
    }

    const transfer = await prisma.LabTransferStatus.create({
      data: {
        isTransfered: status.isTransfered,
        Remark: status.Remark,
      },
    });

    const data = await prisma.OrderedLabPanel.create({
      data: {
        InfoId: info.id,
        PanelId: PanelId[i],
        TransferLabId: transfer.id,
        PaymentStatusId: payment.id,
        Clinic,
        CreatedBy: req.user.userId,
      },
    });
  }

  res.json("done");
};

const getOrderLab = async (req, res) => {
  const { id } = req.params;

  const info = await prisma.OrderedLabPanelInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  })
  const data = await prisma.LabTestResult.findMany({
    where: {
      infoId: info.id,
    },
    orderBy:{
createdDate:"desc"
    },
    include: {
      LabPanels: {
        select: {
          panelsAbbreviation: true,
        },
      },
      LabTests: {
        select: {
          testName: true,
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

  const pinfo = {
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
    Id:data.infoId,
    Panel: data.LabPanels.panelsAbbreviation,
    Test: data.LabTests.testName,
    Result:data.result,
    Release:data.isActive,
    CreatedDate: moment(data.createdDate).format("MMM Do, YYYY, h:mm:ss a"),
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

  
  res.json({all:all ,info: pinfo });
};

const updateOrderLab = async (req, res) => {
  const { id } = req.params;
  const {
    PatientId,
    PanelId,
    AdditionalInformation,
    TransferLabId,
    PaymentStatusId,
    IsActive,
  } = req.body;

  const data = await prisma.OrderedLabPanel.update({
    where: { id: Number(id) },
    data: {
      PatientId,
      PanelId,
      AdditionalInformation,
      TransferLabId,
      PaymentStatusId,
      IsActive,
    },
  });
  res.json(data);
};

const deleteOrderLab = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.OrderedLabPanel.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createOrderLab,
  deleteOrderLab,
  getOrderLab,
  updateOrderLab,
};

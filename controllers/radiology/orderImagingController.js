import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

import moment from "moment";

const createOrderImaging = async (req, res) => {
  const { PatientId, RequestId, Clinic, IsActive } =
    req.body;

  let status = {
    isPayed: false,
    isTransfered: false,
    Remark: "Some Remark",
  };
  const info = await prisma.OrderedImageRequestInfo.create({
    data: {
      PatientId,
      AdditionalInformation: status.Remark,
      CreatedBy: req.user.userId
    },
  });

  for (let i = 0; i < RequestId.length; i++) {
    const payment = await prisma.PaymentStatus.create({
      data: {
        isPayed: status.isPayed,
        Remark: status.Remark,
      },
    });

    const result = await prisma.RadRequestResult.create({
      data: {
        PatientId,
        Clinic,
      },
    });

    const transfer = await prisma.RadTransferStatus.create({
      data: {
        isTransfered: status.isTransfered,
        Remark: status.Remark
      },
    });

    const data = await prisma.OrderedImagRequest.create({
      data: {
        InfoId:info.id,
        RequestId: RequestId[i],
        TransferRadId: transfer.id,
        PaymentStatusId: payment.id,
        ResultId: result.id,
        Clinic: Clinic,
        CreatedBy: req.user.userId
      },
    });
  }

  res.json("data");
};

const getAllOrderImaging = async (req, res) => {
  const data = await prisma.OrderedImagRequest.findMany({});

  res.json(data);
};

const getOrderImaging = async (req, res) => {
  const { id } = req.params;

  const info = await prisma.OrderedImageRequestInfo.findMany({
    where: {
      PatientId: Number(id),
    },
  })
  const data = await prisma.OrderedImagRequest.findMany({
    where: {
      InfoId: info.id,
    },
    include: {
      RadRequest: {
        select: {
          RequestName: true,
        },
      },
      RadRequestResult:{
        select:{
          Result:true,
        }
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
    Id:data.InfoId,
    RequestName: data.RadRequest.RequestName,
    RequestResult: data.RadRequestResult.Result,
    Clinic: data.ClinicList != undefined ? data.ClinicList.ClinicName : "",
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

  
  res.json(all);
};

const updateOrderImaging = async (req, res) => {
  const { id } = req.params;
  const { PatientId, RequestId, AdditionalInformation, IsActive } = req.body;

  const data = await prisma.OrderedImagRequest.update({
    where: { id: Number(id) },
    data: {
      PatientId,
      RequestId,
      AdditionalInformation,
      IsActive,
    },
  });
  res.json(data);
};

const deleteOrderImaging = async (req, res) => {
  const { id } = req.params;

  const data = await prisma.OrderedImagRequest.delete({
    where: {
      id: Number(id),
    },
  });

  res.json(data);
};

export {
  createOrderImaging,
  deleteOrderImaging,
  getAllOrderImaging,
  getOrderImaging,
  updateOrderImaging,
};

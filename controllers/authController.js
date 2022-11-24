import prisma from "../utils/db.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";

const register = async (req, res, next) => {
  const {
    FirstName,
    MiddleName,
    LastName,
    AccountGroupId,
    UserName,
    Password,
    AccountExpirationDate,
    TitleId,
    IdNumber,
    IdTypeId,
    Email,
    PhoneNumberTypeId,
    PhoneNumber,
    RegionId,
    CountryId,
    SubCityId,
    ZoneId,
    WoredaName,
    Kebele,
    HouseNumber,
    GenderId,
  } = req.body;

  const accountStatus = await prisma.AccountStatus.create({
    data: {
      AccountExpirationDate:`${AccountExpirationDate}T13:33:03.969Z`,
      CreatedBy: req.user.userId,
    },
  });

  const woreda = await prisma.Woreda.create({
    data: {
      WoredaName,
      SubCityId,
      CreatedBy: req.user.userId,
    },
  });

  const accountInfo = await prisma.AccountInformation.create({
    data: {
      TitleId,
      IdNumber,
      IdTypeId,
      GenderId,
      Email,
      PhoneNumberTypeId,
      PhoneNumber,
      RegionId,
      CountryId,
      SubCityId,
      ZoneId,
      WoredaId: woreda.id,
      Kebele,
      HouseNumber,
      CreatedBy: req.user.userId,
    },
  });

  const account = await prisma.Accounts.create({
    data: {
      FirstName,
      MiddleName,
      LastName,
      AccountGroupId,
      AccountStatusId: accountStatus.id,
      AccountInformationId: accountInfo.id,
      UserName,
      Password: bcrypt.hashSync(Password, 8),
      CreatedBy: req.user.userId,
    },
  });

  const createJWT = jwt.sign(
    { data: account.id, role: req.user.AccountGroupId },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  const token = createJWT;
  res.status(StatusCodes.CREATED).json({
    data: {
      firstname: account.FirstName,
      middlename: account.MiddleName,
      lastname: account.LastName,
      // role: account.Role,
    },
    token,
  });
  // res.json(token);
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error("Please provide all values");
  }
  const user = await prisma.Accounts.findUnique({
    where: { UserName: username },
    include: { AccountGroup: true },
  });

  const comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, user.Password);
    return isMatch;
  };

  if (!user) {
    throw new Error("Invalid Credentials");
  }
  const isPasswordCorrect = await comparePassword(password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }
  const createJWT = jwt.sign(
    { userId: user.id, role: user.AccountGroupId, user: user.UserName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  const token = createJWT;

  res.status(StatusCodes.OK).json({
    userId: user.id,
    user: user.UserName,
    token,
    role: user.AccountGroupId,
  });
};

const Update = async (req, res) => {
  const { id } = req.params;
  const { Password } = req.body;

  const data = await prisma.Accounts.update({
    where: { id: Number(id) },
    data: {
      Password: bcrypt.hashSync(Password, 8),
    },
  });
  res.json("Password Changed");
};

export { register, login, Update };

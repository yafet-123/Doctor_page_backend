import jwt from "jsonwebtoken";

const admin = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

};
const reception = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication invalid");
  }
};

const other = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication invalid");
  }
};

export {reception,admin,other};
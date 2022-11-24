import cors from "cors";
import express from "express";
const app = express();
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('./swagger.json');

import "express-async-errors";

                   
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";


import {test,
  auth,
  patient,
  clinic,
  role,
  country,
  idtype,
  occupation,
  patientStatus,
  phoneType,
  relationship,
  address,
  title,
  measurement,
  docDashboard,
  intraReferral,
  prescription,
  sickLeave,
  search,
  report,
  diagnosisList,
  radDepartment,
  radRequest,
  orderImaging,
  rad,
  labDepartment,
  labPanel,
  labTest,
  labPanelTest,
  orderLab,
  lab,
  casher,
user} from "./routes/index.js";
// middleware

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
// import authenticateUser from './middleware/auth.js'

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(cors({credentials: true}));
app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "WELCOME TO HMS SERVER 😊😂🤣❤️😍😒👌😘😁👍💕😆😍😘🥰😗😙🤩😶😐🤨😚☺️🙂🤩🤔😴😫😪🥱🤤😝😜😕🙃😝🤤🤑😲😒" });
});

const path = "/api/v1"

app.use(path+"/test", test);
app.use(path+"/auth", auth);
app.use(path+"/patient", patient);
app.use(path+"/clinic", clinic);
app.use(path+"/role", role);
app.use(path+"/country", country);
app.use(path+"/idtype", idtype);
app.use(path+"/labdepartment",labDepartment);
app.use(path+"/labpanel", labPanel);
app.use(path+"/labtest", labTest);
app.use(path+"/labpaneltest", labPanelTest);
app.use(path+"/occupation", occupation);
app.use(path+"/patientstatus", patientStatus);
app.use(path+"/phonetype", phoneType);
app.use(path+"/relationship", relationship);
app.use(path+"/raddepartment", radDepartment);
app.use(path+"/radrequest", radRequest);
app.use(path+"/address", address);
app.use(path+"/title", title);
app.use(path+"/measurement", measurement);
app.use(path+"/docdashboard", docDashboard);
app.use(path+"/intrareferral", intraReferral);
app.use(path+"/orderlab", orderLab);
app.use(path+"/orderimaging", orderImaging);
app.use(path+"/prescription", prescription);
app.use(path+"/sickleave", sickLeave);
app.use(path+"/search", search);
// app.use(path+"/orderlab",orderLab);
app.use(path+"/casher", casher);
app.use(path+"/radiology", rad);
app.use(path+"/laboratory", lab);
app.use(path+"/report", report);
app.use(path+"/diagnosislist", diagnosisList);
app.use(path+"/user", user);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

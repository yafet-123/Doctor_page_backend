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

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
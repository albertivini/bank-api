import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swagger from "swagger-ui-express";
import swaggerFile from "../swagger.json";

import { routes } from "./modules/routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api-docs", swagger.serve, swagger.setup(swaggerFile));

app.use(cors());

app.use(routes);

export { app };

import { Router } from "express";
import { accounts } from "./accounts/accounts.routes";

const routes = Router();

routes.use("/accounts", accounts);

export { routes };

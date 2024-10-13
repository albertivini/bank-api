import { Router } from "express";
import { DepositController } from "./controllers/depositController";
import { WithdrawController } from "./controllers/withdrawController";
import { TransferController } from "./controllers/transferController";
import { CreateController } from "./controllers/createController";

const createController = new CreateController();
const depositController = new DepositController();
const withdrawController = new WithdrawController();
const transferController = new TransferController();

const accounts = Router();

accounts.post("/", createController.handle);
accounts.post("/deposit", depositController.handle);
accounts.post("/withdraw", withdrawController.handle);
accounts.post("/transfer", transferController.handle);

export { accounts };

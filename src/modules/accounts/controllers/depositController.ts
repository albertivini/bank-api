import { Request, Response } from "express";
import { DepositUseCase } from "../useCases/depositUseCase";
import { StatusCodes } from "http-status-codes";
import { schemaValidator } from "../../../utils/schemaValidator";
import { depositSchema } from "../schemas/deposit";
import { DepositBody } from "../interfaces/deposit";
import { PrismaAccountRepository } from "../../../repositories/implementations/prisma/accountRepository";
import { logger } from "../../../services/logger";

export class DepositController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { account, value } = schemaValidator<DepositBody>(
        request.body,
        depositSchema,
      );

      const depositUseCase = new DepositUseCase(new PrismaAccountRepository());

      await depositUseCase.execute({
        account,
        value,
      });

      return response.status(StatusCodes.CREATED).send();
    } catch (err) {
      logger.error(`Deposit Controller :: ${err.message}, body: ${request.body}`);
      return response.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }
}

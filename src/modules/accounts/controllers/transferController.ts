import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { schemaValidator } from "../../../utils/schemaValidator";
import { TransferBody } from "../interfaces/transfer";
import { TransferUseCase } from "../useCases/transferUseCase";
import { transfeSchema } from "../schemas/transfer";
import { PrismaAccountRepository } from "../../../repositories/implementations/prisma/accountRepository";
import { logger } from "../../../services/logger";

export class TransferController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { from, to, value } = schemaValidator<TransferBody>(
        request.body,
        transfeSchema,
      );

      const transferUseCase = new TransferUseCase(new PrismaAccountRepository());

      await transferUseCase.execute({
        from,
        to,
        value,
      });

      return response.status(StatusCodes.CREATED).send();
    } catch (err) {
      logger.error(`Transfer Controller :: ${err.message}, body: ${request.body}`);
      return response.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }
}

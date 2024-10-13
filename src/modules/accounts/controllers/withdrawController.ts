import { Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import { schemaValidator } from "../../../utils/schemaValidator";
import { WithdrawBody } from "../interfaces/withdraw";
import { withdrawSchema } from "../schemas/withdraw";
import { WithdrawUseCase } from "../useCases/withdrawUseCase";
import { PrismaAccountRepository } from "../../../repositories/implementations/prisma/accountRepository";
import { logger } from "../../../services/logger";

export class WithdrawController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { account, value } = schemaValidator<WithdrawBody>(
        request.body,
        withdrawSchema,
      );

      const withdrawUseCase = new WithdrawUseCase(new PrismaAccountRepository());

      await withdrawUseCase.execute({
        account,
        value,
      });

      return response.status(StatusCodes.CREATED).send();
    } catch (err) {
      logger.error(`Withdraw Controller :: ${err.message}, body: ${request.body}`);
      return response.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }
}

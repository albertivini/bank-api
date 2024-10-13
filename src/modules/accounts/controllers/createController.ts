import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { schemaValidator } from "../../../utils/schemaValidator";
import { CreateBody } from "../interfaces/create";
import { createSchema } from "../schemas/create";
import { CreateUseCase } from "../useCases/createUseCase";
import { PrismaAccountRepository } from "../../../repositories/implementations/prisma/accountRepository";
import { logger } from "../../../services/logger";

export class CreateController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { username } = schemaValidator<CreateBody>(
        request.body,
        createSchema,
      );

      const createUseCase = new CreateUseCase(new PrismaAccountRepository());

      await createUseCase.execute({
        username,
      });

      return response.status(StatusCodes.CREATED).send();
    } catch (err) {
      logger.error(`Create Controller :: ${err.message}, body: ${request.body}`);
      return response
        .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          success: false,
          message: err.message,
        });
    }
  }
}

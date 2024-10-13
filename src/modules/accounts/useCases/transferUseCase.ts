import { GENERIC_ERRORS } from "../../../constants/responseMessages";
import { TransactionError } from "../../../utils/exceptions";
import { TransferBody } from "../interfaces/transfer";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IAccountRepository } from "../../../repositories/interfaces/IAccountRepository";
import { logger } from "../../../services/logger";

export class TransferUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ from, to, value }: TransferBody) {
    try {
      await this.accountRepository.transfer(from, to, value);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        logger.error(
          `Transfer UseCase Error:: ${GENERIC_ERRORS.TRANSACTION_ERROR(JSON.stringify(err.meta))}, from: ${from}, to: ${to}, value: ${value}`,
        );
        throw new TransactionError(
          GENERIC_ERRORS.TRANSACTION_ERROR(JSON.stringify(err.meta)),
        );
      }
      throw err;
    }
  }
}

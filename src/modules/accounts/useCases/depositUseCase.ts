import {
  GENERIC_ERRORS,
} from "../../../constants/responseMessages";
import { TransactionError } from "../../../utils/exceptions";
import { DepositBody } from "../interfaces/deposit";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IAccountRepository } from "../../../repositories/interfaces/IAccountRepository";
import { logger } from "../../../services/logger";

export class DepositUseCase {

  constructor(private accountRepository: IAccountRepository){}

  async execute({ account, value }: DepositBody) {
    try {
      await this.accountRepository.deposit(account, value)
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        logger.error(
          `Deposit UseCase Error:: ${GENERIC_ERRORS.TRANSACTION_ERROR(JSON.stringify(err.meta))}, account: ${account}, value: ${value}`,
        );
        throw new TransactionError(
          GENERIC_ERRORS.TRANSACTION_ERROR(JSON.stringify(err.meta)),
        );
      }
      throw err;
    }
  }
}

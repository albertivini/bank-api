import {
  GENERIC_ERRORS,
} from "../../../constants/responseMessages";
import {
  TransactionError,
} from "../../../utils/exceptions";
import { WithdrawBody } from "../interfaces/withdraw";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { IAccountRepository } from "../../../repositories/interfaces/IAccountRepository";
import { logger } from "../../../services/logger";

export class WithdrawUseCase {
  constructor(private accountRepository: IAccountRepository) {}

  async execute({ account, value }: WithdrawBody) {
    try {
      await this.accountRepository.withdraw(account, value);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        logger.error(
          `Withdraw UseCase Error:: ${GENERIC_ERRORS.TRANSACTION_ERROR(JSON.stringify(err.meta))}, account: ${account}, value: ${value}`,
        );
        throw new TransactionError(
          GENERIC_ERRORS.TRANSACTION_ERROR(JSON.stringify(err.meta)),
        );
      }
      throw err;
    }
  }
}

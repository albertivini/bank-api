import { prisma } from "../../../config/prisma";
import { IAccountRepository } from "../../interfaces/IAccountRepository";
import { Account } from "../../../entities/Account";
import { TRANSACTION_TYPES } from "../../../constants/transactionTypes";
import { BusinessError, NotFoundError } from "../../../utils/exceptions";
import { ACCOUNT_ERRORS } from "../../../constants/responseMessages";

export class PrismaAccountRepository implements IAccountRepository {
  getByNumber(accountNumber: number): Promise<Account | void> {
    throw new Error("Method not implemented.");
  }
  async getByUsername(username: string): Promise<Account | void> {
    const databaseAccount = await prisma.account.findUnique({
      where: {
        username,
      },
    });

    if (!databaseAccount) return undefined;

    return new Account(
      databaseAccount.id,
      databaseAccount.username,
      databaseAccount.balance,
    );
  }

  async create(username: string): Promise<void> {
    await prisma.account.create({
      data: {
        username,
      },
    });
  }
  async deposit(account: number, value: number): Promise<void> {
    await prisma.$transaction(async (trx) => {
      const [databaseAccount] = await trx.$queryRaw<
        Account[]
      >`select * from accounts where id = ${account} for update`;

      if (!databaseAccount)
        throw new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);

      await trx.account.update({
        where: {
          id: account,
        },
        data: {
          balance: {
            increment: value,
          },
        },
      });

      await trx.transaction.create({
        data: {
          value,
          accountId: account,
          type: TRANSACTION_TYPES.DEPOSIT,
        },
      });
    });
  }

  async withdraw(account: number, value: number): Promise<void> {
    await prisma.$transaction(async (trx) => {
      const [databaseAccount] = await trx.$queryRaw<
        Account[]
      >`select * from accounts where id = ${account} for update`;

      if (!databaseAccount)
        throw new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);

      if (databaseAccount.balance < value)
        throw new BusinessError(ACCOUNT_ERRORS.INSUFFICIENT_BALANCE);

      await trx.account.update({
        where: {
          id: account,
        },
        data: {
          balance: {
            increment: -value,
          },
        },
      });

      await trx.transaction.create({
        data: {
          value: -value,
          accountId: account,
          type: TRANSACTION_TYPES.WITHDRAW,
        },
      });
    });
  }

  async transfer(from: number, to: number, value: number): Promise<void> {
    await prisma.$transaction(async (trx) => {
      const [fromUser] = await trx.$queryRaw<
        Account[]
      >`select * from accounts where id = ${from} for update`;

      const [toUser] = await trx.$queryRaw<
        Account[]
      >`select * from accounts where id = ${to} for update`;

      if (!fromUser || !toUser)
        throw new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND);

      if (fromUser.balance < value)
        throw new BusinessError(ACCOUNT_ERRORS.INSUFFICIENT_BALANCE);

      await trx.account.update({
        where: {
          id: fromUser.id,
        },
        data: {
          balance: {
            increment: -value,
          },
        },
      });

      await trx.account.update({
        where: {
          id: toUser.id,
        },
        data: {
          balance: {
            increment: value,
          },
        },
      });

      await trx.transaction.create({
        data: {
          value: -value,
          accountId: fromUser.id,
          type: TRANSACTION_TYPES.TRANSFER,
        },
      });

      await trx.transaction.create({
        data: {
          value: value,
          accountId: toUser.id,
          type: TRANSACTION_TYPES.TRANSFER,
        },
      });
    });
  }
}

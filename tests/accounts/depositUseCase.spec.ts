import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { DepositUseCase } from "../../src/modules/accounts/useCases/depositUseCase";
import { NotFoundError } from "../../src/utils/exceptions";
import { ACCOUNT_ERRORS } from "../../src/constants/responseMessages";


describe("Deposit Use Case", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Should deposit in an account', async () => {
    sinon.stub(PrismaAccountRepository.prototype, 'deposit').resolves()

    const depositUseCase = new DepositUseCase(new PrismaAccountRepository())
    
    assert.doesNotThrow(() => depositUseCase.execute({ account: 1, value: 100 }));
  })

  
  it('Should not deposit in an account because repository throw an error', async () => {
    sinon.stub(PrismaAccountRepository.prototype, 'deposit').throws(new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND))

    const depositUseCase = new DepositUseCase(new PrismaAccountRepository())

    await assert.rejects(
      async () => depositUseCase.execute({ account: 1, value: 100 }),
      new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND)
    );
  })
});

import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { NotFoundError } from "../../src/utils/exceptions";
import { ACCOUNT_ERRORS } from "../../src/constants/responseMessages";
import { WithdrawUseCase } from "../../src/modules/accounts/useCases/withdrawUseCase";


describe("Withdraw Use Case", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Should withdraw from an account', async () => {
    sinon.stub(PrismaAccountRepository.prototype, 'withdraw').resolves()

    const withdrawUseCase = new WithdrawUseCase(new PrismaAccountRepository())
    
    assert.doesNotThrow(() => withdrawUseCase.execute({ account: 1, value: 100 }));
  })

  
  it('Should not withdraw from an account because repository throw an error', async () => {
    sinon.stub(PrismaAccountRepository.prototype, 'withdraw').throws(new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND))

    const withdrawUseCase = new WithdrawUseCase(new PrismaAccountRepository())

    await assert.rejects(
      async () => withdrawUseCase.execute({ account: 1, value: 100 }),
      new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND)
    );
  })
});

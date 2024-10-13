import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { CreateUseCase } from "../../src/modules/accounts/useCases/createUseCase";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { BusinessError } from "../../src/utils/exceptions";
import { ACCOUNT_ERRORS } from "../../src/constants/responseMessages";

describe("Create Use Case", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Should create account', async () => {
    sinon.stub(PrismaAccountRepository.prototype, 'getByUsername').resolves()
    sinon.stub(PrismaAccountRepository.prototype, 'create').resolves()

    const createUseCase = new CreateUseCase(new PrismaAccountRepository())
    
    assert.doesNotThrow(() => createUseCase.execute({ username: 'username' }));
  })

  
  it('Should not create account because username already used', async () => {
    sinon.stub(PrismaAccountRepository.prototype, 'getByUsername').resolves({ balance: 0, id: 1, username: 'username'})
    sinon.stub(PrismaAccountRepository.prototype, 'create').resolves()

    const createUseCase = new CreateUseCase(new PrismaAccountRepository())

    await assert.rejects(
      async () => createUseCase.execute({ username: 'username' }),
      new BusinessError(ACCOUNT_ERRORS.USERNAME_ALREADY_USED)
    );
  })
});

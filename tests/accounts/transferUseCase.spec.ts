import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { NotFoundError } from "../../src/utils/exceptions";
import { ACCOUNT_ERRORS } from "../../src/constants/responseMessages";
import { TransferUseCase } from "../../src/modules/accounts/useCases/transferUseCase";

describe("Transfer Use Case", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Should transfer from an account", async () => {
    sinon.stub(PrismaAccountRepository.prototype, "transfer").resolves();

    const transferUseCase = new TransferUseCase(new PrismaAccountRepository());

    assert.doesNotThrow(() =>
      transferUseCase.execute({ from: 1, to: 2, value: 100 }),
    );
  });

  it("Should not transfer from an account because repository throw an error", async () => {
    sinon
      .stub(PrismaAccountRepository.prototype, "transfer")
      .throws(new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND));

    const transferUseCase = new TransferUseCase(new PrismaAccountRepository());

    await assert.rejects(
      async () => transferUseCase.execute({ from: 1, to: 2, value: 100 }),
      new NotFoundError(ACCOUNT_ERRORS.ACCOUNT_NOT_FOUND),
    );
  });
});

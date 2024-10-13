import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { Request, Response } from "express";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { TransferController } from "../../src/modules/accounts/controllers/transferController";

describe("Transfer Controller", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Should transfer between two accounts", async () => {
    const transferSpy = sinon
      .stub(PrismaAccountRepository.prototype, "transfer")
      .resolves();

    const transferController = new TransferController();

    const request = {
      body: {
        from: 1,
        to: 2,
        value: 1,
      },
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    await transferController.handle(request, response);

    assert.equal(transferSpy.called, true);
  });

  it("Should not call the transfer method because the body is wrong", async () => {
    const transferSpy = sinon
      .stub(PrismaAccountRepository.prototype, "transfer")
      .resolves();

    const transferController = new TransferController();

    const request = {
      body: {
        from: 1,
        to: 1,
        value: 1,
      },
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    await transferController.handle(request, response);

    assert.equal(transferSpy.called, false);
  });
});

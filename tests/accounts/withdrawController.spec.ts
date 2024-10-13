import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { Request, Response } from "express";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { WithdrawController } from "../../src/modules/accounts/controllers/withdrawController";

describe("Withdraw Controller", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Should withdraw in an account", async () => {
    const withdrawSpy = sinon
      .stub(PrismaAccountRepository.prototype, "withdraw")
      .resolves();

    const withdrawController = new WithdrawController();

    const request = {
      body: {
        account: 1,
        value: 1,
      },
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    await withdrawController.handle(request, response);

    assert.equal(withdrawSpy.called, true);
  });

  it("Should not call the withdraw method because the body is wrong", async () => {
    const withdrawSpy = sinon
      .stub(PrismaAccountRepository.prototype, "withdraw")
      .resolves();

    const withdrawController = new WithdrawController();

    const request = {
      body: {
        account: "account",
        value: 1,
      },
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    await withdrawController.handle(request, response);

    assert.equal(withdrawSpy.called, false);
  });
});

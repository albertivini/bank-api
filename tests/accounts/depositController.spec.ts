import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { Request, Response } from "express";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { DepositController } from "../../src/modules/accounts/controllers/depositController";

describe("Deposit Controller", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it("Should deposit in an account", async () => {
    const depositSpy = sinon
      .stub(PrismaAccountRepository.prototype, "deposit")
      .resolves();

    const depositController = new DepositController();

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

    await depositController.handle(request, response);

    assert.equal(depositSpy.called, true);
  });

  it("Should not call the deposit method because the body is wrong", async () => {
    const depositSpy = sinon
      .stub(PrismaAccountRepository.prototype, "deposit")
      .resolves();

    const depositController = new DepositController();

    const request = {
      body: {
        account: 'account',
        value: 1,
      },
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    await depositController.handle(request, response);

    assert.equal(depositSpy.called, false);
  });
});

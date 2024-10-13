import { it, describe, beforeEach } from "node:test";
import assert from "node:assert";
import sinon from "sinon";
import { Request, Response } from "express";
import { PrismaAccountRepository } from "../../src/repositories/implementations/prisma/accountRepository";
import { CreateController } from "../../src/modules/accounts/controllers/createController";

describe("Create Controller", () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Should call all the methods and create an account', async () => {
    const getSpy = sinon.stub(PrismaAccountRepository.prototype, 'getByUsername').resolves();
    const createSpy = sinon.stub(PrismaAccountRepository.prototype, 'create').resolves();

    const createController = new CreateController();

    const request = {
      body: {
        username: 'username'
      }
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.send = sinon.stub().returns(response);

    await createController.handle(request, response);

    assert.equal(getSpy.called, true)
    assert.equal(createSpy.called, true)
  });

  it('Should not call the create method', async () => {
    const getSpy = sinon.stub(PrismaAccountRepository.prototype, 'getByUsername').resolves({ balance: 0, id: 1, username: 'username'});
    const createSpy = sinon.stub(PrismaAccountRepository.prototype, 'create').resolves();

    const createController = new CreateController();

    const request = {
      body: {
        username: 'username'
      }
    } as unknown as Request;

    const response = {} as Response;
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns(response);

    await createController.handle(request, response);

    assert.equal(getSpy.called, true)
    assert.equal(createSpy.called, false)
  });
});

import { it, describe } from "node:test";
import assert from "node:assert";
import { Request, Response } from "express";
import { schemaValidator } from "../../src/utils/schemaValidator";
import Joi from "joi";
import { SchemaValidatorError } from "../../src/utils/exceptions";

const schema = Joi.object().keys({
  parameter1: Joi.string().required(),
  parameter2: Joi.number().negative().required(),
  parameter3: Joi.string(),
});

describe("Schema Validator Util", () => {
  it("Should resolve the schema validation", async () => {
    const testBody = {
      parameter1: "parameter",
      parameter2: -5,
    };

    assert.deepEqual(schemaValidator(testBody, schema), testBody);
  });

  it("Should reject the schema validation", async () => {
    const testBody = {
      parameter1: "parameter",
      parameter2: -5,
      notParameter: "wrongParameter",
    };

    assert.rejects(
      async () => schemaValidator(testBody, schema),
      new SchemaValidatorError('"notParameter" is not allowed'),
    );
  });
});

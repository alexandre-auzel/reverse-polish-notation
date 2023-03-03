import { InputType, RPNInterpretor } from ".";
import { createError, getSuccess, getError } from "./utils";

describe("RPNInterpretor", () => {
  test("One number", () => {
    // GIVEN
    const input: InputType = [1];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN

    expect(getSuccess(actual)).toEqual(1);
  });

  test("One addition", () => {
    // GIVEN
    const input: InputType = [1, 1, "+"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN

    expect(getSuccess(actual)).toEqual(2);
  });

  test("One addition", () => {
    // GIVEN
    const input: InputType = [1, 2, "+"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(3);
  });

  test("Add new operations", () => {
    // GIVEN
    const input: InputType = [1, 2, "*"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(2);
  });

  test("Add new operations", () => {
    // GIVEN
    const input: InputType = [1, 2, "-"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(-1);
  });

  test("Add new operations", () => {
    // GIVEN
    const input: InputType = [2, 4, "/"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(0.5);
  });

  test("Multiple operations", () => {
    // GIVEN
    const input: InputType = [1, 2, 3, "-", "+"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(0);
  });

  test("CONTROLE: Multiple operations", () => {
    // GIVEN
    const input: InputType = [1, 2, 5, 4, "*", "-", 3, "+", "+"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(-14);
  });

  test("Add new operations", () => {
    // GIVEN
    const input: InputType = [2, 4, "NEGATE", "+"];
    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getSuccess(actual)).toEqual(-2);
  });
});
describe("Error management on RPN", () => {
  test("Empty input", () => {
    // GIVEN
    const input: InputType = [];

    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getError(actual)).toEqual("empty input");
  });

  test("Malformed input", () => {
    // GIVEN
    const input: InputType = [1, "+"];

    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getError(actual)).toEqual("malformed input");
  });
  test("Malformed input", () => {
    // GIVEN
    const input: InputType = ["NEGATE"];

    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getError(actual)).toEqual("malformed input");
  });

  test("Division by 0", () => {
    // GIVEN
    const input: InputType = [3, 0, "/"];

    // WHEN
    const actual = RPNInterpretor(input);

    // THEN
    expect(getError(actual)).toEqual("division by zero");
  });
});

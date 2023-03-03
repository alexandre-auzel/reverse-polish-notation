import { createError, createSuccess, isError, Result, Success } from "./utils";

const computeBinaryOperationResult = (operand1: Operand, operand2: Operand, operator: Operator): Result<number> => {
  switch (operator) {
    case "+":
      return createSuccess(operand1 + operand2);
    case "*":
      return createSuccess(operand1 * operand2);
    case "-":
      return createSuccess(operand1 - operand2);
    case "/":
      if (operand2 === 0) {
        return createError("division by zero");
      }
      return createSuccess(operand1 / operand2);
  }
};

const computeUnaryOperationResult = (operand: Operand, operator: Operator): Success<number> => {
  switch (operator) {
    case "NEGATE":
      return createSuccess(-1 * operand);
  }
};
const allBinaryOperators = ["+", "-", "*", "/"] as const;
const allUnaryOperators = ["NEGATE"] as const;

type Operand = number;
type BinaryOperator = typeof allBinaryOperators[number];
type UnaryOperator = typeof allUnaryOperators[number];
type Operator = BinaryOperator | UnaryOperator;

const isUnaryOperator = (inputElement: Operand | Operator): inputElement is UnaryOperator => {
  return allUnaryOperators.includes(inputElement as UnaryOperator);
};
const isBinaryOperator = (inputElement: Operand | Operator): inputElement is BinaryOperator => {
  return allBinaryOperators.includes(inputElement as BinaryOperator);
};

export type InputType = Array<Operand | Operator>;

const recursiveRPN = (stack: Operand[], input: InputType): Result<number> => {
  if (input.length === 0) {
    if (stack.length === 0) {
      throw new Error("Stack empty when input has been read entirely");
    }
    return createSuccess(stack[0]);
  }
  const [element, ...rest] = input;
  const copyStack = [...stack];
  if (isBinaryOperator(element)) {
    if (copyStack.length < 2) {
      return createError("malformed input");
    }
    const num2 = copyStack.pop();
    const num1 = copyStack.pop();
    const operationResult = computeBinaryOperationResult(num1, num2, element);
    return operationResult.bind((result) => recursiveRPN([...copyStack, result], rest));
  }
  if (isUnaryOperator(element)) {
    if (copyStack.length < 1) {
      return createError("malformed input");
    }
    const num1 = copyStack.pop();
    return recursiveRPN([...copyStack, computeUnaryOperationResult(num1, element).result], rest);
  }
  return recursiveRPN([...stack, element], rest);
};

export const RPNInterpretor = (input: InputType) => {
  if (input.length === 0) {
    return createError("empty input");
  }
  return recursiveRPN([], [...input]);
};

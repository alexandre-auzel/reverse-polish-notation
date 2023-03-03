type Next<U, V> = (result: U) => Result<V>;

type AbstractResult<Type extends "success" | "error", U> = {
  type: Type;
  bind: <V>(next: Next<U, V>) => Result<V>;
};

export type Success<U> = AbstractResult<"success", U> & {
  result: U;
};
export type Error<U> = AbstractResult<"error", U> & {
  message: string;
};

export type Result<U> = Success<U> | Error<U>;

export const isError = <U>(result: Result<U>): result is Error<U> => {
  return result.type === "error";
};

export const isSuccess = <U>(result: Result<U>): result is Success<U> => {
  return result.type === "success";
};

export const createSuccess = <U>(result: U): Success<U> => ({
  type: "success",
  result,
  bind: (next) => next(result),
});

export const createError = <U>(message: string): Error<U> => ({
  type: "error",
  message,
  bind: () => createError(message),
});

export const getSuccess = <U>(result: Result<U>): U => {
  return (result as Success<U>).result;
};

export const getError = <U>(result: Result<U>): string => {
  return (result as Error<U>).message;
};

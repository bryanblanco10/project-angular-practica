export const handledAsyncFunction = async <T, E>(asyncFunc: Promise<T>): Promise<[T | null, E | null]> => {
  try {
    const res = await asyncFunc;
    return [res, null];
  } catch (error) {
    return [null, error as E];
  }
};

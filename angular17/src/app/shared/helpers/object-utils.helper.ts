export const isEmpty = (obj: object): boolean =>
  Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;

import { isEmpty } from '../object-utils.helper';

describe('isEmpty helper function', () => {

  it('should return true for an empty object', () => {
    const obj = {};
    expect(isEmpty(obj)).toBe(true);
  });

  it('should return false for an object with properties', () => {
    const obj = { key: 'value' };
    expect(isEmpty(obj)).toBe(false);
  });

  it('should return false for an instance of a class without own properties', () => {
    class TestClass {}
    const obj = new TestClass();
    expect(isEmpty(obj)).toBe(false);
});

  it('should return false for an array (even if it is empty)', () => {
    const obj: any[] = [];
    expect(isEmpty(obj)).toBe(false);
  });

  it('should return false for an array with items', () => {
    const obj = [1, 2, 3];
    expect(isEmpty(obj)).toBe(false);
  });

});


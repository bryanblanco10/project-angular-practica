import { TestBed } from '@angular/core/testing';

import { LocalstorageService } from '../localstorage.service';

describe('LocalstorageService', () => {
  let service: LocalstorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageService);
  });

  it('should be created LocalstorageService', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve a string', () => {
    const key = 'stringKey';
    const value = 'someString';
    service.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);
  });

  it('should store and retrieve a number', () => {
    const key = 'numberKey';
    const value = 42;
    service.setItem(key, value);
    expect(service.getItem<number>(key)).toEqual(value);
  });

  it('should store and retrieve an object', () => {
    const key = 'objectKey';
    const value = { someKey: 'someValue' };
    service.setItem(key, value);
    expect(service.getItem<typeof value>(key)).toEqual(value);
  });

  it('should remove an item', () => {
    const key = 'stringKey';
    const value = 'someString';
    service.setItem(key, value);
    service.removeItem(key);
    expect(service.getItem(key)).toBeNull();
  });

  it('should clear all items', () => {
    const key1 = 'stringKey';
    const value1 = 'someString';
    const key2 = 'numberKey';
    const value2 = 42;
    service.setItem(key1, value1);
    service.setItem(key2, value2);
    service.clear();
    expect(service.getItem(key1)).toBeNull();
    expect(service.getItem<number>(key2)).toBeNull();
  });
});

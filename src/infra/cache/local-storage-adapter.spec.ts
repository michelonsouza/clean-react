import faker from 'faker';
import 'jest-localstorage-mock';

import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should call localStorage with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    await sut.set(key, value);

    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should call localStorage throws Error', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();

    jest.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new Error();
    });

    await expect(sut.set(key, value)).rejects.toThrow(new Error());
  });
});

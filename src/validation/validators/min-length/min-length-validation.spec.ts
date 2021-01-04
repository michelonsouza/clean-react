import faker from 'faker';

import { InvalidFieldError } from '@/validation/errors';
import { MinLengthValidation } from './min-length-validation';

const makeSut = (field: string): MinLengthValidation =>
  new MinLengthValidation(field, 5);

describe('MinLengthValidation', () => {
  it('should return error if value is invalid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3) });

    expect(error).toEqual(new InvalidFieldError(field));
  });

  it('should return falsy if value is valid', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });

    expect(error).toBeFalsy();
  });

  it('should return undefined if field does not exists in schema', () => {
    const field = faker.database.column();
    const sut = makeSut(field);
    const error = sut.validate({
      [faker.database.column()]: faker.random.alphaNumeric(5),
    });

    expect(error).toBeFalsy();
  });
});

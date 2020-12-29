import faker from 'faker';

import { InvalidFieldError } from '@/validation/errors';
import { EmailValidation } from './email-validation';

const makeSut = (): EmailValidation =>
  new EmailValidation(faker.random.words());

describe('EmailValidation', () => {
  it('should return error if email is invalid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.database.column());

    expect(error).toEqual(new InvalidFieldError('email'));
  });

  it('should return falsy if email is valid', () => {
    const sut = makeSut();
    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });

  it('should return falsy if email is empty', () => {
    const sut = makeSut();
    const error = sut.validate('');

    expect(error).toBeFalsy();
  });
});

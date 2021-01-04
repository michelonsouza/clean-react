import faker from 'faker';

import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
  CompareFieldsValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.database.column();
    const validators = sut.field(field).required().build();

    expect(validators).toEqual([new RequiredFieldValidation(field)]);
  });

  it('should return EmailValidation', () => {
    const field = faker.database.column();
    const validators = sut.field(field).email().build();

    expect(validators).toEqual([new EmailValidation(field)]);
  });

  it('should return MinLengthValidation', () => {
    const field = faker.database.column();
    const length = faker.random.number();
    const validators = sut.field(field).min(length).build();

    expect(validators).toEqual([new MinLengthValidation(field, length)]);
  });

  it('should return MinLengthValidation', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const validators = sut.field(field).sameAs(fieldToCompare).build();

    expect(validators).toEqual([
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });

  it('should return a list of validators', () => {
    const field = faker.database.column();
    const fieldToCompare = faker.database.column();
    const length = faker.random.number();
    const validators = sut
      .field(field)
      .required()
      .min(length)
      .email()
      .sameAs(fieldToCompare)
      .build();

    expect(validators).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field),
      new CompareFieldsValidation(field, fieldToCompare),
    ]);
  });
});

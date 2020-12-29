import {
  RequiredFieldValidation,
  EmailValidation,
} from '@/validation/validators';
import { ValidationBuilder as sut } from './validation-builder';

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const validators = sut.field('any_field').required().build();

    expect(validators).toEqual([new RequiredFieldValidation('any_field')]);
  });

  it('should return EmailValidation', () => {
    const validators = sut.field('any_field').email().build();

    expect(validators).toEqual([new EmailValidation('any_field')]);
  });
});

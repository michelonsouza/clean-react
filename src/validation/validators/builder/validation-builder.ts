import { FieldValidation } from '@/validation/protocols';
import {
  RequiredFieldValidation,
  EmailValidation,
  MinLengthValidation,
} from '@/validation/validators';
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation';

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validators: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, []);
  }

  required(): ValidationBuilder {
    this.validators.push(new RequiredFieldValidation(this.fieldName));

    return this;
  }

  email(): ValidationBuilder {
    this.validators.push(new EmailValidation(this.fieldName));

    return this;
  }

  min(length: number): ValidationBuilder {
    this.validators.push(new MinLengthValidation(this.fieldName, length));

    return this;
  }

  sameAs(fieldToCompare: string): ValidationBuilder {
    this.validators.push(
      new CompareFieldsValidation(this.fieldName, fieldToCompare),
    );

    return this;
  }

  build(): FieldValidation[] {
    return this.validators;
  }
}

import { FieldValidation } from '@/validation/protocols';
import { InvalidFieldError } from '@/validation/errors';

export class CompareFieldsValidation implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly fieldToCompare: string,
  ) {}

  validate(input: Record<string, string>): Error | undefined {
    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError(this.field)
      : undefined;
  }
}

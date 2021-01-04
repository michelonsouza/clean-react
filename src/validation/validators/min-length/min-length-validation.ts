import { InvalidFieldError } from '@/validation/errors';
import { FieldValidation } from '@/validation/protocols';

export class MinLengthValidation implements FieldValidation {
  constructor(readonly field: string, private readonly minLength: number) {}

  validate(input: Record<string, string>): Error | undefined {
    return !input[this.field] || input[this.field].length >= this.minLength
      ? undefined
      : new InvalidFieldError(this.field);
  }
}

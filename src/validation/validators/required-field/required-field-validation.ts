import { FieldValidation } from '@/validation/protocols';
import { RequiredFieldError } from '@/validation/errors';

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: Record<string, unknown>): Error | undefined {
    return input[this.field] ? undefined : new RequiredFieldError();
  }
}

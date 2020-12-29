import { FieldValidation } from '@/validation/protocols';

export class FieldValidationSpy implements FieldValidation {
  error: Error | undefined = undefined;

  constructor(readonly field: string) {}

  validate(_: string): Error | undefined {
    return this.error;
  }
}

import { Validation } from '@/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage = '';

  fieldName = '';

  fieldValue = '';

  validate(fieldName: string, input: Record<string, string>): string {
    this.fieldName = fieldName;
    this.fieldValue = input[fieldName];

    return this.errorMessage;
  }
}

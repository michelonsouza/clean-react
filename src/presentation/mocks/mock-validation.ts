import { Validation } from '@/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage = '';

  fieldName = '';

  fieldValue = '';

  validate(fieldName: string, fieldValue: string): string | null {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;

    return this.errorMessage;
  }
}

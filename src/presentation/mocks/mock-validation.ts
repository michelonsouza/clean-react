import { Validation } from '@/presentation/protocols/validation';

export class ValidationSpy implements Validation {
  errorMessage = '';

  fieldName = '';

  fieldValue = '';

  validate(fieldName: string, fieldValue: string): string {
    this.fieldName = fieldName;
    this.fieldValue = fieldValue;

    return this.errorMessage;
  }
}

import { Validation } from '@/presentation/protocols';
import { FieldValidation } from '@/validation/protocols';

export class ValidationComposite implements Validation {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter(
      validator => validator.field === fieldName,
    );

    for (let i = 0; i < validators.length; i += 1) {
      const error = validators[i].validate(fieldValue);

      if (error) {
        return error.message;
      }
    }

    return '';
  }
}

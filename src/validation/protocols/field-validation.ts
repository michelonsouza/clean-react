export interface FieldValidation {
  field: string;

  validate(input: Record<string, string>): Error | undefined;
}

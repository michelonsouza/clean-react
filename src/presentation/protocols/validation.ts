export interface Validation {
  validate(fieldName: string, input: Record<string, string>): string;
}

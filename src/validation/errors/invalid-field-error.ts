export class InvalidFieldError extends Error {
  constructor(fieldName: string) {
    super(`O campo ${fieldName} é inválido`);
    this.name = 'InvalidFieldError';
  }
}

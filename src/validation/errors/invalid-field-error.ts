export class InvalidFieldError extends Error {
  /* istanbul ignore next */
  constructor(fieldName: string) {
    super(`O campo ${fieldName} é inválido`);
    this.name = 'InvalidFieldError';
  }
}

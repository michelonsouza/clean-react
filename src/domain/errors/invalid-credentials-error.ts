export class InvalidCredentialsError extends Error {
  /* istanbul ignore next */
  constructor() {
    super('Credenciais inválidas');
    this.name = 'InvalidCredentialsError';
  }
}

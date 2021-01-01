export class InvalidCredentialsError extends Error {
  /* istanbul ignore next */
  constructor() {
    super('Esse e-mail já está em uso');
    this.name = 'InvalidCredentialsError';
  }
}

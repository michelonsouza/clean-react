export class RequiredFieldError extends Error {
  /* istanbul ignore next */
  constructor() {
    super('Campo obrigatório');
    this.name = 'RequiredFieldError';
  }
}

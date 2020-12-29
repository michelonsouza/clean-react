export class UnexpectedError extends Error {
  /* istanbul ignore next */
  constructor() {
    super('Algo de errado aconteceu. Tente novamente em alguns minutos.');
    this.name = 'UnexpectedError';
  }
}

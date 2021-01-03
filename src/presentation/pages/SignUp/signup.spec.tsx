import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  cleanup,
  render,
  fireEvent,
  RenderResult,
} from '@testing-library/react';
import faker from 'faker';

import {
  testChildCount,
  testButtonIsDisabled,
  testStatusForField,
  ValidationSpy,
} from '@/presentation/mocks';
import { SignUp } from '@/presentation/pages';

const history = createMemoryHistory({
  initialEntries: ['/signup'],
});

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

const makeSut = (errorMessage = ''): SutTypes => {
  const validationSpy = new ValidationSpy();
  validationSpy.errorMessage = errorMessage;

  const sut = render(
    <Router history={history}>
      <SignUp validation={validationSpy} />
    </Router>,
  );
  return {
    sut,
    validationSpy,
  };
};

const populateField = (
  { getByTestId }: RenderResult,
  elementTestId: string,
  value = faker.random.word(),
): void => {
  const inputElement = getByTestId(elementTestId) as HTMLInputElement;
  fireEvent.input(inputElement, { target: { value } });
};

describe('SingUp Page', () => {
  afterEach(cleanup);

  it('should not render error message on start', () => {
    const { sut } = makeSut();
    testChildCount(sut, 'error-wrap', 0);
  });

  it('should be disabled button on start', () => {
    const { sut } = makeSut();

    testButtonIsDisabled(sut, 'signup-button');
  });

  it('should be input status as required on start', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut(validationError);

    testStatusForField(sut, 'name', validationError);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
    testStatusForField(sut, 'passwordConfirmation', validationError);
  });

  it('should show name error if Validation fails', () => {
    const { sut, validationSpy } = makeSut(faker.random.words());

    populateField(sut, 'name');
    testStatusForField(sut, 'name', validationSpy.errorMessage);
  });
});
